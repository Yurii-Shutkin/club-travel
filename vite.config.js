import {defineConfig} from 'vite'
// import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import {resolve} from 'path'
import {globSync} from 'glob'
import handlebars from 'vite-plugin-handlebars'
import autoprefixer from 'autoprefixer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import sortMediaQueries from 'postcss-sort-media-queries';
import {hulakPlugins} from 'vite-plugin-hulak-tools'

const BASE_URL = '/club-travel/'; // name project in gitHub

const pages = Object.fromEntries(
    globSync(['./*.html', './pages/*.html'], {ignore: 'node_modules/**'}).map(file => {
        const name = path.basename(file, '.html');
        return [name, resolve(__dirname, file)];
    })
);

export default defineConfig({
    base: BASE_URL,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    css: {
        postcss: {
            plugins:
                [
                    autoprefixer(),
                    sortMediaQueries({sort: 'desktop-first'}),
                ],
        },
    },

    plugins: [
        // basicSsl(),
        {
            name: 'dev-pages-rewrite',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url.startsWith(BASE_URL)) {
                        const cleanPath = req.url.substring(BASE_URL.length);
                        const name = path.basename(cleanPath.split('?')[0], '.html');
                        if (name && globSync(`./pages/${name}.html`).length > 0) {
                            req.url = BASE_URL + `pages/${name}.html`;
                        }
                    }
                    next();
                });
            }
        },

        //  for build dist without /pages/
        {
            name: 'flatten-pages-plugin',
            enforce: 'post',
            generateBundle(_, bundle) {
                for (const fileName in bundle) {
                    if (fileName.startsWith('pages/') && fileName.endsWith('.html')) {
                        const newName = path.basename(fileName);
                        bundle[fileName].fileName = newName;
                    }
                }
            }
        },

        hulakPlugins({
            enableHandlebars: true,
            handlebarsOptions: {
                partialDirectory: './src/html'
            }
        }),

        handlebars({
            partialDirectory: path.resolve(__dirname, 'src/html'),
            helpers: {
                split: (str) => {
                    if (typeof str === 'string') {
                        return str.split(',').map(item => item.trim());
                    }
                    return [];
                },
                first: (arr) => (Array.isArray(arr) ? arr[0] : arr),
                json: (str) => JSON.parse(str),
            }
        }),

        ViteImageOptimizer({
            exclude: /\.svg$/,
            svg: false,
            png: { compressionLevel: 7, },
            jpeg: { progressive: true, quality: 85 },
            webp: { lossy: true, quality: 85 },
            avif: { lossy: true, quality: 85 },
        }),

        {
            name: 'handlebars-full-reload',
            handleHotUpdate({file, server}) {
                if (file.endsWith('.html')) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    })
                }
            },
        },
    ],

    server: {
        // https: true,
        watch: {
            ignored: ['**/*.webp']
        },
    },

    // build: {
    //     sourcemap: false,
    //     rollupOptions: {
    //         input: {
    //             ...pages,
    //         },
    //     },
    // },
    build: {
        target: 'es2015',
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        sourcemap: false,
        rollupOptions: {
            input: {
                ...pages,
            },
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
        cssMinify: true,
    },
})