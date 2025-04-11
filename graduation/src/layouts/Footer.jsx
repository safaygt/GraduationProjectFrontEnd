import React from 'react';
import '../assets/css/Footer.css'; // CSS dosyasını içe aktar

function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} SAFA YİĞİT</p>
        </footer>
    );
}

export default Footer;