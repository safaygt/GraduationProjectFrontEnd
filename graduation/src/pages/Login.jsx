import React, { useState } from 'react';
import AuthApi from '../services/authServiceLogin';
import { Link,useNavigate } from 'react-router-dom';
import '../assets/css/login.css';
import { toast } from 'react-toastify';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthApi.login(username, password);
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
      
            <div className="full-page-wrapper">
                <div className="image-panel">
                </div>

             
                <div className="login-container">
                    <div className="login-form">
                        <h2>Geri Dönüşüm Takip Sistemi</h2>
                        <form onSubmit={handleLogin}>
                            <div>
                                <label>Kullanıcı Adı:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Kullanıcı Adınızı Giriniz"
                                />
                            </div>
                            <div>
                                <label>Şifre:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Şifrenizi Giriniz"
                                />
                            </div>
                         
                            <button type="submit">Giriş Yap</button>
                        </form>

                        <div className="register-link-container">
                             <p className="text-sm text-gray-600">
                                Henüz üye değil misiniz? 
                                <Link to="/register" className="register-link">Kayıt Olun</Link>
                             </p>
                        </div>
                    </div>
                </div>
            </div>
       
    );
}

export default Login;