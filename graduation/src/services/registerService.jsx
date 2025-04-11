import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/'; // Backend URL'nizi kontrol edin

const register = async (name, lastName, username, password) => {
    try {
        const response = await axios.post(API_URL + 'register', {
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