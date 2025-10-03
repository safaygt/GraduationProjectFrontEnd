import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../assets/css/about.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function About() {
    const [formData, setFormData] = useState({
        name: '',
        mail: '',
        message: '',
    });



    useEffect(() => {

        toast.dismiss();

    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const templateParams = {
                name: formData.name,
                mail: formData.mail,
                message: formData.message,
            };

            await emailjs.send(
                'service_gsj9h1p',
                'template_vl8f0b6',
                templateParams,
                '_niUc3CFt89f-PLgx'
            );

            toast.success('Mesajınız başarıyla gönderildi!');
            setFormData({ name: '', mail: '', message: '' });
        } catch (error) {
            console.error('Mail gönderilemedi:', error);
            toast.error('Mesaj gönderilirken bir hata oluştu.');
        }
    };

    return (
        <div className="about-container">
            <div className="about-left">
                <div className="contact-form">
                    <h2>Bize Ulaşın</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Ad Soyad:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mail">Mail:</label>
                            <input
                                type="email"
                                id="mail"
                                name="mail"
                                value={formData.mail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Mesaj:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Gönder</button>
                    </form>
                </div>
            </div>
            
            <div className="about-right">
                <div className="google-maps-container">
                    <h2>Konumumuz</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8942938581595!2d30.32289857519519!3d40.74235143575829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ccad1f0582e81f%3A0xe36064490ace325e!2zU2FrYXJ5YSDDnG5pdmVyc2l0ZXNpIEJpbGdpc2F5YXIgdiBCaWxpxZ9pbSBCaWxpbWxlcmkgRmFrw7xsdGVzaSBZYXrEsWzEsW0gTcO8aGVuZGlzbGnEn2kgQsO2bMO8bcO8!5e0!3m2!1str!2str!4v1759514037394!5m2!1str!2str"
                        title="Sakarya Üniversitesi Bilgisayar ve Bilişim Bilimleri Fakültesi"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}




<iframe  width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


export default About;