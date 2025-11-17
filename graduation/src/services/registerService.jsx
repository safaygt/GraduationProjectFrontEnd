import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const API_URL = '/auth/'; 

const register = async (name, lastName, username, password) => {
    try {
        const response = await axiosInstance.post(API_URL + 'register', {
            name,
            lastName,
            username,
            password,
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