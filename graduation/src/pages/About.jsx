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
    );
}

export default About;