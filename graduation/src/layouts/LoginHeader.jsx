import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/loginHeader.css';

function LoginHeader() {
    return (
        <div className="login-header">

            <nav>
                <ul>
                    <li>
                        <Link to="/register">Kayıt Ol</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default LoginHeader;