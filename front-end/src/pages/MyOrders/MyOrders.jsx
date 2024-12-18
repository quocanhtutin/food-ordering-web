import React, { useContext, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import axios from 'axios'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData(response.data.data)
        console.log(response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [])


    return (
        <div className='my-orders'>
            <h2>Đơn hàng</h2>
            <div className="container">
                {data.map((order, index) => {
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
                            <button onClick={fetchOrders}>Kiểm tra trạng thái</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
