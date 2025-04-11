import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/registerHeader.css';

function RegisterHeader() {
    return (
        <div className="register-header">

            <nav>
                <ul>
                    <li>
                        <Link to="/login">Giriş Yap</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default RegisterHeader;