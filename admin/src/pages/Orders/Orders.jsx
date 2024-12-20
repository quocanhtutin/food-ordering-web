import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import OrderItem from './OrderItem.jsx'

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");

    const fetchAllOrders = async () => {
        const response = await axios.get(`${url}/api/order/list`);

        if (response.data.success) {
            setOrders([...response.data.data].reverse());
            // setOrders(orders => [...orders, ...response.data.data])
            console.log(response.data.data)
            console.log("orders", orders)

        }
        else {
            toast.error('Error')
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + '/api/order/status', {
            orderId,
            status: event
        })
        if (response.data.success) {
            await fetchAllOrders()
        }
    }

    const handleFilterChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    useEffect(() => {
        fetchAllOrders();
    }, [])

    const filteredOrders = orders.filter(order => {
        if (selectedStatus === "Tất cả") return true;
        else if (selectedStatus === "Đã hoàn thành")
            return order.status === "Hoàn tất";
        else if (selectedStatus === "Đã huỷ")
            return order.status === "Hủy đơn";
        else
            return order.status !== "Hoàn tất" && order.status !== "Hủy đơn";

    });

    return (
        <div className='order add'>
            <div className="order-header">
                <h3>Danh sách đơn hàng</h3>
                <select value={selectedStatus} onChange={handleFilterChange}>
                    <option value="Tất cả">Tất cả</option>
                    <option value="Chưa hoàn thành">Chưa hoàn thành</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                    <option value="Đã huỷ">Đã huỷ</option>
                </select>
            </div>


            <div className="order-list">
                {filteredOrders.map((order, index) => {
                    return (
                        <div className='order-item-container'>
                            <div key={index} className='order-item'>
                                {/* <img src={assets.parcel_icon} alt="" /> */}
                                <div className='order-item-food'>
                                    <div className='order-item-header'>
                                        <p>Đơn hàng: <strong>{order.code}</strong></p>
                                        <p>Số tiền: <strong>{order.amount}đ</strong></p>
                                        <p>Trạng thái: <strong>{order.status}</strong></p>
                                    </div>
                                    {order.items.map((item, index) => (
                                        <OrderItem key={index} name={item.name} image={item.image} quantity={item.quantity} />
                                    ))}
                                </div>
                                <div className='order-item-address'>
                                    <p className='order-item-address-header'>Thông tin khách hàng</p>
                                    <p className='order-item-name'>Tên: <strong>{order.address.name}</strong></p>
                                    <div className="order-item-address">
                                        <p>Địa chỉ: <strong>{order.address.street}</strong></p>
                                    </div>
                                    <p className='order-item-phone'>Số điện thoại: <strong>{order.address.phone}</strong></p>
                                </div>


                                {/* <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                                <option value="Chưa thanh toán">Chưa thanh toán</option>
                                <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                                <option value="Đang vận chuyển">Đang vận chuyển</option>
                                <option value="Hoàn tất">Hoàn tất</option>
                                <option value="Hủy đơn">Hủy đơn</option>
                            </select> */}
                            </div>
                            <div className='order-item-button'>
                                {order.status === "Đang chuẩn bị"
                                && <button onClick={() => statusHandler("Đang vận chuyển", order._id)}>Giao hàng</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders
