import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const API_URL = '/auth/'; // Backend URL'nizi kontrol edin

const register = async (name, lastName, username, password) => {
    try {
        const response = await axiosInstance.post(API_URL + 'register', {
            name,
            lastName,
            username,
            password,
        });
        return response.data; // İsteğe bağlı olarak yanıtı döndürebilirsiniz
    } catch (error) {
        throw error.response.data; // Hata durumunda hatayı döndür
    }
};

const registerService = {
    register,
};

export default registerService;