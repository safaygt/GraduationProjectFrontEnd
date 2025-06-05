import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../assets/css/dashboard.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [expanded, setExpanded] = useState({});
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Bu satır ikinci kod bloktan alındı
        setSelectedFile(file);
        setResult(null); // Bu satır ikinci kod bloktan alındı
        setProgress(0); // Bu satır ikinci kod bloktan alındı
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
        // toast.dismiss() çağrısı güvenli hale getirildi
        if (toast && typeof toast.dismiss === 'function') { // Güvenli kontrol eklendi
            toast.dismiss();
        }

        const user = AuthService.getCurrentUser();
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
                return prevProgress + 1; // Yükleme hızını ayarlayabilirsiniz
            });
        }, 60); // Her 60ms'de bir ilerleme

        try {
            const user = AuthService.getCurrentUser();
            const token = user ? user.token : null;

            const response = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            // Yükleme başarılı olduğunda intervali durdur ve %100 yap
            clearInterval(interval);
            setProgress(100);

            // Sonuçları göster ve toast mesajını ver
            setTimeout(() => {
                setLoading(false);
                setResult(response.data);
                toast.success("Tahmin başarıyla tamamlandı!");
            }, 300);

        } catch (error) {
            console.error("Yükleme veya tahmin hatası:", error); // Hata detaylarını görmek için
            toast.error("Tahmin yapılamadı. Lütfen tekrar deneyin.");
            clearInterval(interval); // Hata durumunda intervali durdur
            setLoading(false);
            setProgress(0); // Hata durumunda ilerlemeyi sıfırla
        }
    };

    const toggleExpand = (item) => {
        setExpanded(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const recycleItems = [
        {
            id: 'kagit',
            title: 'Kağıt',
            image: '../src/assets/kagit.jpg',
            description: 'Kağıt, geri dönüştürülebilir atıkların en önemlilerinden biridir. Geri dönüştürülmüş kağıt, yeni kağıt ürünlerinin üretiminde kullanılır ve ormanların korunmasına yardımcı olur. Geri dönüştürülmüş kağıt kullanmak, enerji tasarrufu sağlar ve hava kirliliğini azaltır. Kağıt geri dönüşümü, atık depolama alanlarının dolmasını önler ve doğal kaynakların korunmasına katkıda bulunur. Geri dönüştürülmüş kağıt, gazete, dergi, karton kutu ve ambalaj malzemeleri gibi çeşitli ürünlerin üretiminde kullanılır. Kağıt geri dönüşümü, sürdürülebilir bir çevre için önemlidir.',
        },
        {
            id: 'metal',
            title: 'Metal',
            image: '../src/assets/metal.jpg',
            description: 'Metal, geri dönüştürülebilir atıkların önemli bir türüdür. Alüminyum ve çelik gibi metaller, geri dönüştürülerek yeni ürünlerin üretiminde kullanılır. Metal geri dönüşümü, enerji tasarrufu sağlar ve doğal kaynakların korunmasına yardımcı olur. Geri dönüştürülmüş metal, otomotiv, inşaat, ambalaj ve elektronik gibi çeşitli sektörlerde kullanılır. Metal geri dönüşümü, atık depolama alanlarının dolmasını önler ve çevre kirliliğini azaltır. Metal geri dönüşümü, sürdürülebilir bir gelecek için önemlidir.',
        },
        {
            id: 'cam',
            title: 'Cam',
            image: '../src/assets/cam.jpg',
            description: 'Cam, sonsuz kez geri dönüştürülebilen nadir malzemelerden biridir. Geri dönüştürülmüş cam, yeni cam ürünlerinin üretiminde kullanılır ve enerji tasarrufu sağlar. Cam geri dönüşümü, doğal kaynakların korunmasına yardımcı olur ve çevre kirliliğini azaltır. Geri dönüştürülmüş cam, şişe, kavanoz, cam ambalaj ve cam elyafı gibi çeşitli ürünlerin üretiminde kullanılır. Cam geri dönüşümü, atık depolama alanlarının dolmasını önler ve sürdürülebilir bir çevre için önemlidir.',
        },
        {
            id: 'plastik',
            title: 'Plastik',
            image: '../src/assets/plastik.png',
            description: 'Plastik atıklar, doğada uzun yıllar çözünmeden kalabilir ve çevre kirliliğine neden olur. Plastik geri dönüşümü, enerji tasarrufu sağlar ve doğal kaynakların korunmasına yardımcı olur. Geri dönüştürülmüş plastik, ambalaj, tekstil, otomotiv ve inşaat gibi çeşitli sektörlerde kullanılır. Plastik geri dönüşümü, atık depolama alanlarının dolmasını önler ve çevre kirliliğini azaltır. Plastik geri dönüşümü, sürdürülebilir bir gelecek için önemlidir.',
        },
    ];

    return (
        <div className="dashboard-container">
            <div className="geri-donusum-bilgileri-container">
                <div className="geri-donusum-bilgileri">
                    {recycleItems.map(item => (
                        <div className="geri-donusum-item" key={item.id}>
                            <img src={item.image} alt={item.title} className="geri-donusum-resim" />
                            <h3>{item.title}</h3>
                            <p>
                                {expanded[item.id] ? item.description : `${item.description.substring(0, 100)}...`}
                            </p>
                            {item.description.length > 100 && (
                                <div className="expand-button-container">
                                    <button className="expand-button" onClick={() => toggleExpand(item.id)}>
                                        {expanded[item.id] ? '▲ Daha Az Göster' : '▼ Daha Fazla Göster'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
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
                            <div className="note-message">
                                <p>Not: Daha doğru sonuçlar için, sade arka planda sabit bir şekilde çekiniz.</p>
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
                            </div>
                        ) : (
                            <p>Herhangi bir geri dönüştürülebilir malzeme bulunamadı.</p>
                        )}
                    </div>
                )}

                {result && result.processed_image_url && (
                    <div className="processed-image-container">
                        <h3>İşlenen resimdeki tespitler.</h3>
                        <img src={result.processed_image_url} alt="Tespit Edilen Resim" className="processed-image" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;