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
        window.location.href = BASE_URL + '/auth.html';
    },

    async validate() {
        const token = this.getToken();
        console.log(token)
        if (!token) return false;


        try {
            const response = await fetch(`${STRAPI_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('ok', response)
            return response.ok; 
        } catch (error) {
            console.error("Ошибка проверки сессии", error);
            return false;
        }
    }
};
