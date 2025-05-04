import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080/auth/';

const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { username, password });
        if (response.data.token) {
            const decodedToken = jwtDecode(response.data.token);
            const userId = decodedToken.userId;
            const user = {
                username: username,
                token: response.data.token,
                id: userId,
                exp: decodedToken.exp,
            };
            localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
    } catch (error) {
        const errMessage = error.response?.data || "Sunucu hatası";
        throw errMessage;
    }
};


const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const now = Math.floor(Date.now() / 1000); // Şu anki zamanı saniye cinsinden al
        if (user.exp < now) { // Token süresi dolmuşsa
            logout(); // Logout yap
            return null; // Kullanıcıyı null döndür
        }
    }
    return user;
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;