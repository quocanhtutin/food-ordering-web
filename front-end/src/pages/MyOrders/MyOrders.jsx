import React, { useContext, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import axios from 'axios'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData([...response.data.data].reverse())
        console.log(response.data.data)
    }

    const handleFilterChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

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
                {filteredOrders.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>{order.amount} đ</p>
                            <p>Số lượng món: {order.items.length}</p>
                            <p>Trạng thái: <b>{order.status}</b></p>
                            {order.status !== "Chưa thanh toán"
                                ? <button onClick={fetchOrders}>Kiểm tra trạng thái</button>
                                : <button onClick={fetchOrders}>Thanh toán ngay</button>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
