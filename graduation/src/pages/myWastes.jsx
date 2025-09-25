import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import '../assets/css/MyWastes.css';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

function MyWastes() {
    const [recycles, setRecycles] = useState([]);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const user = AuthService.getUser();
        if (!user) {
            toast.error('Kullanıcı oturum açmamış.');
            setLoading(false);
            return;
        }

        const fetchRecycles = async () => {
            try {
                const response = await axiosInstance.get(`api/recycles/user/${user.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                response.data.sort((a, b) => a.id - b.id);
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
            setProductsLoading(true);
            const productsData = {};
            const user = AuthService.getUser();

            const fetchAll = recycles.map(async (recycle) => {
                try {
                    const res = await axiosInstance.get(`api/recycles/recycle/${recycle.id}/products`, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    productsData[recycle.id] = res.data;
                } catch (err) {
                    console.error(`Ürünler alınamadı: ${recycle.id}`, err);
                    productsData[recycle.id] = []; 
                }
            });

            await Promise.all(fetchAll);
            setProducts(productsData);
            setProductsLoading(false); 
        };

        if (recycles.length > 0) {
            fetchProducts();
        }
    }, [recycles]);

    if (loading || productsLoading) {
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

                        <tr>
                            <td colSpan="2" className="no-recycle-found">Geri dönüşüm bulunamadı.</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }

    const totalPages = Math.ceil(recycles.length / pageSize);
    const paginatedRecycles = recycles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (newPage) => setCurrentPage(newPage);

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
                        paginatedRecycles.map((recycle, index) => (
                            <tr key={recycle.id}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>
                                    {products[recycle.id] && products[recycle.id].length > 0 ? (
                                        products[recycle.id].map(product => (
                                            <p key={product.id}>- {product.fkproductType.productName} ({product.count} adet)</p>
                                        ))
                                    ) : (
                                        <p>Ürün tespit edilemedi.</p>
                                    )}
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
