import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Payment.css'
import { useLocation, useParams } from 'react-router-dom'
const Payment = () => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, addToCart, url } = useContext(StoreContext);


    const script = "https://script.google.com/macros/s/AKfycbxgRIc5MF7cbXQ1vAkuySvNYswMQZjREVt9novtC6i2TmmiwundiMCBsY0CCl-RgplT/exec";

    // const orderCode = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderCode = queryParams.get('orderCode');


    const bankContent = {
        BANK_ID: 'MB',
        ACCOUNT_NO: '777211004',
        TEMPLATE: 'compact',
        AMOUNT: getTotalCartAmount()===0?0:(getTotalCartAmount()+20000),
        DESCRIPTION: orderCode
    }

    const qrCodeUrl = `https://img.vietqr.io/image/${bankContent.BANK_ID}-${bankContent.ACCOUNT_NO}-${bankContent.TEMPLATE}.png?amount=${bankContent.AMOUNT}&addInfo=${bankContent.DESCRIPTION}&accountName=DO XUAN HUY`


    return (
        <div className='payment'>
            <div className='qr-code'>
                <img src={qrCodeUrl} alt='qr-code' />
            </div>
            <div className='payment-details'>
                <p className="status">
                    <div className="spinner"></div>
                    Đang Chờ Thanh Toán ...
                </p>
                <p>Sử dụng App Banking để quét mã phía trên.</p>
                <p>Hoặc chuyển khoản với thông tin sau</p>
                <p>Số tiền: <strong>{getTotalCartAmount() + 20000} VNĐ</strong></p>
                <p>Ngân hàng: <strong>MB Bank</strong></p>
                <p>
                    Số tài khoản: <strong>777211004  </strong>
                </p>
                <p>Chủ tài khoản: <strong>DO XUAN HUY</strong></p>
                <div className='content-tranfer'>
                    <strong>Nội dung chuyển khoản</strong>
                    <p>{orderCode }</p>
                </div>

            </div>
        </div>
    )
}

export default Payment
