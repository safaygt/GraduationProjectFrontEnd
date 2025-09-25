// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = AuthService.getToken();
        if (!token || AuthService.isTokenExpired()) {
            AuthService.logout();
            navigate('/login', { replace: true });
        }

    }, [navigate]);

    return children;
}