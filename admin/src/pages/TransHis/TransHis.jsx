import React, { useEffect, useState } from 'react';
import './TransHis.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const TransHis = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lưu trữ lỗi nếu có

    const fetchAllTransHis = async () => {
        try {
            const response = await axios.get(`${url}/api/proxy`);

            if (response.data.error) {
                throw new Error(response.data.message || "Lỗi không xác định");
            }

            setData(response.data.data);
        } catch (error) {
            setError(error.message);
            toast.error("Lỗi khi lấy danh sách giao dịch: " + error.message);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchAllTransHis();
    }, [url]); 

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>Không thể lấy dữ liệu: {error}</div>;
    }

    return (
        <div className='transhis add flex-col'>
            <h3>Lịch sử nhận tiền</h3>
            <div className='transhis-table'>
                <div className="transhis-table-format title-transhis">
                    <b>Mã giao dịch</b>
                    <b>Nội dung</b>
                    <b>Số tiền</b>
                    <b>Ngày giao dịch</b>
                    <b>STK nhận</b>
                </div>
                {
                    data.map((item, index) => (
                        <div key={index} className='transhis-table-format'>
                            <p>{item["Mã GD"]}</p>
                            <p>{item["Mô tả"]}</p>
                            <p>{item["Giá trị"]}</p>
                            <p>{item["Ngày diễn ra"]}</p>
                            <p>{item["Số tài khoản"]}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TransHis;
