import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

    const { getTotalCartAmount, token, food_list, cartItems, url, userName, userEmail } = useContext(StoreContext)

    const [data, setData] = useState({
        name: userName,
        email: userEmail,
        street: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 20000,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url)
        }
        else {
            alert("Error")
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/cart")
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Thông tin giao hàng</p>
                <input required name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Họ tên' />
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Địa chỉ' />
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Tổng tiền</h2>
                    <div>
                        <div className="cart-total-detail">
                            <p>Hóa đơn</p>
                            <p>{getTotalCartAmount()}đ</p>
                        </div>
                        <hr />
                        <div className="cart-total-detail">
                            <p>Phí giao hàng</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 20000}đ</p>
                        </div>
                        <hr />
                        <div className="cart-total-detail">
                            <b>Tổng</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20000}đ</b>
                        </div>
                    </div>
                    <button type='submit'>Thanh toán</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
