import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Payment.css'
const Payment = () => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, addToCart, url } = useContext(StoreContext);

    const bankContent = {
        BANK_ID: 'MB',
        ACCOUNT_NO: '777211004',
        TEMPLATE: 'compact',
        AMOUNT: getTotalCartAmount(),
        DESCRIPTION: 'CC'
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
                    <p>cc</p>
                </div>
                
            </div>
        </div>
    )
}

export default Payment
