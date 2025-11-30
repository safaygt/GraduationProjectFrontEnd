import React, { useState, useEffect, useRef } from "react";
import axiosInstance from '../utils/axiosInstance';
import AuthService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../assets/css/dashboard.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import recycleItems from "../constants/recycleItems";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Dashboard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [expanded, setExpanded] = useState({});
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setResult(null);
        setProgress(0);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setResult(null);
        setProgress(0);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        if (toast && typeof toast.dismiss === 'function') {
            toast.dismiss();
        }

        const user = AuthService.getUser();
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.warning("Lütfen bir resim seçin!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        setLoading(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 2;
            });
        }, 60);

        try {
            const response = await axiosInstance.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${AuthService.getToken()}`
                    
                }
            });

            clearInterval(interval);
            setProgress(100);

            setTimeout(() => {
                setLoading(false);
                setResult(response.data);
                toast.success("Tahmin başarıyla tamamlandı!");
            }, 300);

        } catch (error) {
            console.error("Yükleme veya tahmin hatası:", error);
            toast.error("Tahmin yapılamadı. Lütfen tekrar deneyin.");
            clearInterval(interval);
            setLoading(false);
            setProgress(0);
        }
    };

    const toggleExpand = (item) => {
        setExpanded(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    return (
        <div className="dashboard-container">
            <section className="carousel-section w-100">
            <div id="recycleCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                {recycleItems.map((item, index) => (
                    <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <div
                        className="carousel-item-bg d-flex flex-column justify-content-end text-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div className="carousel-caption-custom">
                            <h5>{item.title}</h5>
                            <p>
                                {expanded[item.id]
                                    ? item.description
                                    : `${item.description.substring(0, 150)}...`}
                            </p>
                            {item.description.length > 150 && (
                                <button
                                    className="btn btn-link p-0 text-white"
                                    onClick={() => toggleExpand(item.id)}
                                >
                                    {expanded[item.id] ? "▲ Daha Az Göster" : "▼ Daha Fazla Göster"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#recycleCarousel"
            data-bs-slide="prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Önceki</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#recycleCarousel"
            data-bs-slide="next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Sonraki</span>
        </button>
    </div>
</section>

            <div className="resim-yukleme-alani-container">
                <div className="resim-yukleme-alani">
                    <button onClick={handleButtonClick}>Dosya Seç</button>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                    />
                    <button onClick={handleUpload}>Hesapla</button>
                    {selectedFile && (
                        <>
                            <div className="file-info-container">
                                <p className="file-name">{selectedFile.name}</p>
                                <button className="remove-file-button" id="deleteButton" onClick={handleRemoveFile}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                </button>
                            </div>
                            
                        </>
                    )}
                </div>

                {loading && (
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                )}

                {result && (
                    <div className="tahmin-sonucu">
                        <h3>Tahmin Sonucu</h3>
                        {result.detections && result.detections.length > 0 ? (
                            <div>
                                {result.class_counts && Object.entries(result.class_counts).map(([className, count]) => (
                                    <p key={className}>{className}: {count} adet dönüştürdünüz!</p>
                                ))}
                                {result.total_effect && (
                                    <p>Bu geri dönüşümle dünyaya %{result.total_effect.toFixed(4)} katkı verdiniz.</p>
                                )}
                                <div className="note-message">
                                    <p>Not: Daha doğru sonuçlar için, sade arka planda sabit bir şekilde çekiniz.</p>
                                </div>
                            </div>
                        ) : (
                            <p>Herhangi bir geri dönüştürülebilir malzeme bulunamadı.</p>
                        )}
                    </div>
                )}

                {result && result.processed_image_url && (
                    <div className="processed-image-container">
                        <h3>İşlenen Resimdeki Tespitler</h3>
                        <img src={result.processed_image_url} alt="Tespit Edilen Resim" className="processed-image" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
