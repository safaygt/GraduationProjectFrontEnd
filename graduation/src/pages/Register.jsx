import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerService from '../services/registerService';
import '../assets/css/register.css';
import { toast } from 'react-toastify';

function Register() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Form kontrolü
        if (!name || !lastName || !username || !password) {
            toast.warning("Lütfen tüm alanları doldurun!");
            return;
        }

        try {
            const response = await registerService.register(name, lastName, username, password);
            toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
            navigate('/login');
        } catch (err) {
            let errorMsg = "Kayıt işlemi başarısız.";
            if (typeof err === 'string') {
                errorMsg = err;
            } else if (err?.response?.data) {
                errorMsg = err.response.data;
            }
            toast.error(errorMsg);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Kayıt Ol</h2>
                <form onSubmit={handleRegister}>
                    <div>
                        <label>İsim:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Soyisim:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Kullanıcı Adı:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Şifre:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Kayıt Ol</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
