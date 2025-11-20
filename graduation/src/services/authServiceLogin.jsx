import axiosInstance from '../utils/axiosInstance';
import AuthService from './authService';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/auth/';

const login = async (username, password) => {
    try {
        const response = await axiosInstance.post(API_URL + 'login', { username, password });

        if (response.data.token) {
            const token = response.data.token;
            AuthService.setToken(token);

            const decodedToken = jwtDecode(token);

            const userId = decodedToken.userId;
            
            const userUsername = decodedToken.sub;

            const user = {
                id: userId,
                username: userUsername,
            };
            localStorage.setItem('user', JSON.stringify(user));

        } else {
            console.error("Token not found in login response:", response.data);
            throw new Error("Giriş işlemi başarısız. Token alınamadı.");
        }
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data || error.message || "Giriş işlemi sırasında bir hata oluştu";
        throw new Error(errorMessage);
    }
};

const AuthApi = {
    login,
};

export default AuthApi;