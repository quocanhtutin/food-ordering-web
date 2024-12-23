import React, { useEffect, useState } from 'react';
import './TransHis.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const TransHis = ({ url }) => {
    const [originalData, setOriginalData] = useState([]); // Dữ liệu gốc
    const [filteredData, setFilteredData] = useState([]); // Dữ liệu đã lọc
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchAllTransHis = async () => {
        try {
            const response = await axios.get(`${url}/api/proxy`);

            if (response.data.error) {
                throw new Error(response.data.message || "Lỗi không xác định");
            }

            // Sắp xếp giao dịch mới nhất trước
            const sortedData = response.data.data.sort(
                (a, b) => new Date(b["Ngày diễn ra"]) - new Date(a["Ngày diễn ra"])
            );

            setOriginalData(sortedData);
            setFilteredData(sortedData);
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

    const handleFilter = () => {
        if (!startDate || !endDate) {
            toast.warning("Vui lòng chọn cả hai ngày bắt đầu và kết thúc!");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const filtered = originalData.filter(transaction => {
            const transactionDate = new Date(transaction["Ngày diễn ra"]);
            return transactionDate >= start && transactionDate <= end;
        });

        setFilteredData(filtered);
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>Không thể lấy dữ liệu: {error}</div>;
    }

    return (
        <div className='transhis add flex-col'>
            <div className='transhis-title'>
                <h3>Lịch sử nhận tiền</h3>
                <div className="filter-container">
                    <label>
                        Từ ngày:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label>
                        Đến ngày:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    <button onClick={handleFilter}>Lọc</button>
                </div>
            </div>
            <div className='transhis-table'>
                <div className="transhis-table-format title-transhis">
                    <b>Mã giao dịch</b>
                    <b>Nội dung</b>
                    <b>Số tiền</b>
                    <b>Ngày giao dịch</b>
                    <b>STK nhận</b>
                </div>
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div key={index} className='transhis-table-format'>
                            <p>{item["Mã GD"]}</p>
                            <p>{item["Mô tả"]}</p>
                            <p>{item["Giá trị"]}</p>
                            <p>{item["Ngày diễn ra"]}</p>
                            <p>{item["Số tài khoản"]}</p>
                        </div>
                    ))
                ) : (
                    <div className="no-data">Không có giao dịch phù hợp!</div>
                )}
            </div>
        </div>
    );
};

export default TransHis;
