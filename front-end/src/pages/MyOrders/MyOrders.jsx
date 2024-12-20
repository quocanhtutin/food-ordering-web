import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Item from './Item';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData([...response.data.data].reverse());
        console.log(response.data.data);
    };

    const handleFilterChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const navigate = useNavigate();

    const payHandler = (orderCode, amount) => {
        console.log(orderCode);
        navigate(`/payment?orderCode=${orderCode}&amount=${amount}`);
    };

    const statusHandler = async (stt, orderId) => {
        try {
            const response = await axios.post(url + '/api/order/status', {
                orderId,
                status: stt
            });
            if (response.data.success) {
                await fetchOrders();
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const filteredOrders = data.filter(order => {
        if (selectedStatus === "Tất cả") return true;
        else if (selectedStatus === "Chưa thanh toán")
            return order.status === "Chưa thanh toán";
        else if (selectedStatus === "Đang chuẩn bị")
            return order.status === "Đang chuẩn bị";
        else if (selectedStatus === "Đang giao")
            return order.status === "Đang vận chuyển";
        else if (selectedStatus === "Đã giao")
            return order.status === "Hoàn tất";
        else if (selectedStatus === "Đã huỷ") {
            return order.status === "Đã huỷ";
        }
    });

    return (
        <div className='my-orders'>
            <div className="my-orders-header">
                <h1>Đơn hàng của tôi</h1>
                <select value={selectedStatus} onChange={handleFilterChange}>
                    <option value="Tất cả">Tất cả</option>
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                    <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Đã huỷ">Đã huỷ</option>
                </select>
            </div>
            <div className="container">
                {filteredOrders.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        {/* <img src={assets.parcel_icon} alt="" /> */}
                        <div className="order-status">
                            <p>Trạng thái: <strong>{order.status}</strong></p>
                        </div>
                        <div className='order-items'>
                            {order.items.map((item, index) => (
                                <Item key={index} name={item.name} image={item.image} price={item.price} quantity={item.quantity} />
                            ))}
                        </div>
                        {/* <p>{order.amount} đ</p>
                        <p>Số lượng món: {order.items.length}</p>
                        <p>Trạng thái: <b>{order.status}</b></p> */}
                        <div className='order-amount'>Thành tiền: <strong>{order.amount} đ</strong></div>
                        <div className='order-button'>
                            {order.status === "Chưa thanh toán"
                                ? <div className='not-paid'><button onClick={() => payHandler(order.code, order.amount)}>Thanh toán ngay</button>
                                    <button onClick={() => statusHandler("Hủy đơn", order._id)}>Hủy đơn hàng</button>
                                </div>

                                : order.status === "Đang chuẩn bị"
                                    ? <div className='preparing'>
                                        <button onClick={fetchOrders}>Kiểm tra trạng thái</button>
                                    </div>
                                    : order.status === "Đang vận chuyển"
                                        ? <div className='deliverying'>
                                            <button onClick={()=>statusHandler("Hoàn tất", order._id)}>Đã nhận được hàng</button>
                                        </div>
                                        : <div></div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
