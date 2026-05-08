import '@/js/services/user/google-auth.js';
import { links } from '@/data/links.js';

const STRAPI_URL = 'https://club-travel-strapi.onrender.com';
const BASE_URL = 'http://localhost:5173/club-travel';

export const auth = {
    getToken() {
        return localStorage.getItem('jwt');
    },

    setSession(token, user) {
        localStorage.setItem('jwt', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    logout() {
        localStorage.clear();
        window.location.href = links.authorization.href;
    },

    async validate() {
        const token = this.getToken();
        if (!token) return false;


        try {
            const response = await fetch(`${STRAPI_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.ok; 
        } catch (error) {
            console.error("Ошибка проверки сессии", error);
            return false;
        }
    }
};
