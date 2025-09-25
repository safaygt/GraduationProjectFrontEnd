import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="register-container">
            <div className="register-form">
                <h2>Kayıt Ol</h2>
                <form onSubmit={handleRegister}>
                    <div>
                        <label>İsim:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Soyisim:</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Kullanıcı Adı:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Şifre:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
            </div>
            
            {showModal && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <button className="modal-close-button" onClick={handleCloseModal}>&times;</button>
                        <pre className="modal-text">{fullConstText}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;