import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerService from '../services/registerService';
import '../assets/css/register.css';
import { toast } from 'react-toastify';
import fullConstText from '../constants/consentText';

function Register() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isConsentChecked, setIsConsentChecked] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !lastName || !username || !password) {
            toast.warning("Lütfen tüm alanları doldurun!");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Şifre en az 8 karakter olmalı, bir büyük harf ve bir rakam içermelidir.");
            return;
        }

        if (!isConsentChecked) {
            toast.error("Kayıt olmak için açık rıza metnini onaylamanız gerekmektedir.");
            return;
        }

        try {
            const response = await registerService.register(name, lastName, username, password,isConsentChecked);
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
    
    const handleOpenModal = (e) => {
      e.preventDefault(); 
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === "modal-overlay") {
          handleCloseModal();
        }
      };

      return (
        <>
            <div className="register-wrapper">
                
                <div className="register-container-left">
                    <div className="register-form">
                        <h2>Geri Dönüşüm Takip Sistemi - Kayıt</h2>
                        <form onSubmit={handleRegister}>
                            <div>
                                <label>İsim:</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Adınızı Giriniz"
                                    required 
                                />
                            </div>
                            <div>
                                <label>Soyisim:</label>
                                <input 
                                    type="text" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    placeholder="Soyadınızı Giriniz"
                                    required 
                                />
                            </div>
                            <div>
                                <label>Kullanıcı Adı:</label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    placeholder="Kullanıcı Adınızı Belirleyiniz"
                                    required 
                                />
                            </div>
                            <div>
                                <label>Şifre (En az 8 karakter, 1 Büyük Harf, 1 Rakam):</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Şifrenizi Belirleyiniz"
                                    required 
                                />
                            </div>
                            
                            <div className="consent-checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={isConsentChecked}
                                    onChange={(e) => setIsConsentChecked(e.target.checked)}
                                    id="consent-checkbox"
                                />
                                <label htmlFor="consent-checkbox">
                                    <a href="#" onClick={handleOpenModal}>Açık rıza metnini</a> okudum ve onaylıyorum.
                                </label>
                            </div>
                            
                            <button type="submit">Kayıt Ol</button>
                        </form>

                        <div className="login-link-container">
                             <p className="text-sm text-gray-600">
                                Zaten üye misiniz? 
                                <Link to="/login" className="login-link"> Giriş Yapın</Link>
                             </p>
                        </div>
                    </div>
                </div>
                
                <div className="image-panel">
                </div>
            </div>
            
            {showModal && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <button className="modal-close-button" onClick={handleCloseModal}>&times;</button>
                        <pre className="modal-text">{fullConstText}</pre>
                    </div>
                </div>
            )}
        </>
    );
}

export default Register;