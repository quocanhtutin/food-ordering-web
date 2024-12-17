import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Món ăn</p>
                    <p>Tên món</p>
                    <p>Giá thành</p>
                    <p>Số lượng</p>
                    <p>Tổng</p>
                    <p>Xóa</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price}đ</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{item.price * cartItems[item._id]}đ</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}đ</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>Tiến hành thanh toán</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>Mã giảm giá</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='Nhập mã' />
                            <button>Thêm mã</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
