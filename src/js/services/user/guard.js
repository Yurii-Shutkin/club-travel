import { auth } from './auth.js';

const ACCOUNT_PATH = '/account.html';
const AUTH_PATH = '/auth.html';
const AUTH_PAGE_PATHS = ['/auth', '/signup', '/auth.html', '/signup.html'];
const PUBLIC_PATHS = ['/', '/index.html'];

function withBase(path) {
  const baseDir = 'http://localhost:5173/club-travel';
  

  return `${baseDir}${path}`;
}

function isAuthPage(pathname) {
  return AUTH_PAGE_PATHS.some(path => pathname.includes(path));
}

function isPublicPage(pathname) {
  return isAuthPage(pathname) || PUBLIC_PATHS.includes(pathname);
}

export async function initGuard() {
  const token = auth.getToken();
  const pathname = window.location.pathname;

  if (token) {
    const isValidSession = await auth.validate();

    if (!isValidSession) {
      auth.logout();
      return;
    }

    if (isAuthPage(pathname)) {
      window.location.href = withBase(ACCOUNT_PATH);
      return;
    }
  } else if (!isPublicPage(pathname)) {
    window.location.href = withBase(AUTH_PATH);
    return;
  }

  document.documentElement.classList.add('ready');
}



