import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from '../services/authService';
import '../assets/css/MyWastes.css';

function MyWastes() {
    const [recycles, setRecycles] = useState([]);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            toast.error('Kullanıcı oturum açmamış.');
            setLoading(false);
            return;
        }

        const fetchRecycles = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/recycles/user/${user.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setRecycles(response.data);
                setLoading(false);
            } catch (err) {
                toast.error('Geri dönüşüm verileri alınamadı');
                setLoading(false);
            }
        };

        fetchRecycles();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = {};
            for (const recycle of recycles) {
                try {
                    const user = AuthService.getCurrentUser();
                    const response = await axios.get(`http://localhost:8080/api/recycles/recycle/${recycle.id}/products`, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    productsData[recycle.id] = response.data;
                } catch (err) {
                    console.error(`Ürünler alınamadı: ${recycle.id}`, err);
                }
            }
            setProducts(productsData);
        };

        if (recycles.length > 0) {
            fetchProducts();
        }
    }, [recycles]);

    if (loading) return <div>Yükleniyor...</div>;

    const totalPages = Math.ceil(recycles.length / pageSize);
    const paginatedRecycles = recycles.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "pagination-button active" : "pagination-button"}
                >
                    {i}
                </button>
            );
        }
        return <div className="pagination">{pages}</div>;
    };

    return (
        <div className="my-wastes-container">
            <table className="wastes-table">
                <thead>
                    <tr>
                        <th>Geri Dönüşüm No</th>
                        <th>Geri Dönüştürülen Ürünler</th>
                    </tr>
                </thead>
                <tbody>
                    {recycles.length > 0 ? (
                        paginatedRecycles.map(recycle => (
                            <tr key={recycle.id}>
                                <td>{recycle.id}</td>
                                <td>
                                    {products[recycle.id] && products[recycle.id].map(product => (
                                        <p key={product.id}>- {product.fkproductType.productName} ({product.count} adet)</p>
                                    ))}
                                    {!products[recycle.id] && <p>Ürün bulunamadı.</p>}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="no-recycle-found">Geri dönüşüm bulunamadı.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {recycles.length > 0 && renderPagination()}
        </div>
    );
}

export default MyWastes;