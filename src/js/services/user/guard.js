import { auth } from './auth.js';

const BASE_URL = 'http://localhost:5173/club-travel';

export async function initGuard() {
    
    const token = auth.getToken();
    const path = window.location.pathname;

    const authPages = ['/auth', '/signup', '/auth.html', '/signup.html'];
    const isAuthPage = authPages.some(p => path.includes(p));

    if (token) {
        const isValid = await auth.validate();
        
        if (isValid) {
            if (isAuthPage) {
                window.location.href = BASE_URL + '/account.html'; 
              }
            } else {
              auth.logout();
            }
          } else {
            const isPublicPage = isAuthPage || path === '/' || path === '/index.html';
            if (!isPublicPage) {
              window.location.href = BASE_URL +'/auth.html';
            }
          }
          document.documentElement.classList.add('ready');
}

