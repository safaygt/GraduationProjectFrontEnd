import React, { useState } from 'react';
import AuthApi from '../services/authServiceLogin'; // AuthServiceLogin yerine AuthApi kullanıldı
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';
import { toast } from 'react-toastify';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthApi.login(username, password); // AuthApi.login olarak değiştirildi
            navigate('/main');
        } catch (err) {
            let errorMsg = "Giriş başarısız.";
            if (err && typeof err === 'string') {
                errorMsg = err;
            } else if (err?.message) {
                errorMsg = err.message;
            }
            toast.error(errorMsg);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Giriş Yap</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Kullanıcı Adı:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Şifre:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Giriş Yap</button>
                </form>
            </div>
        </div>
    );
}

export default Login;