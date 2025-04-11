import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import '../assets/css/header.css';

function Header() {
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const navigateToMain = () => {
        navigate('/main')
    }

    const navigateToAbout = () => {
        navigate('/about')
    }

    return (
        <header>
            <nav>
                <ul>
                    {user ? (
                        <>
                            <li className='ana'>
                                <button onClick={navigateToMain}>Ana Sayfa</button>
                            </li>

                            <li className='hakkinda'>
                                <button onClick={navigateToAbout}>Bize Ulaş</button>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Çıkış Yap</button>
                            </li>
                        </>
                    ) : null}
                </ul>
            </nav>
        </header>
    );
}

export default Header;