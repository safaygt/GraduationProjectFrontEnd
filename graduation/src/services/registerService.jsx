import axiosInstance from '../utils/axiosInstance';

const API_URL = '/auth/';

// isConsentChecked parametresi eklendi
const register = async (name, lastName, username, password, isConsentChecked) => {
    try {
        const response = await axiosInstance.post(API_URL + 'register', {
            name,
            lastName,
            username,
            password,
            isConsentChecked, 
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const registerService = {
    register,
};

export default registerService;