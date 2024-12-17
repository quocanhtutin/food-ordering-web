import React, { useContext, useEffect } from 'react';
import './CartPopup.css';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const CartPopup = () => {

    const {getTotalCartAmount} = useContext(StoreContext);
    const { cartItems, food_list, url } = useContext(StoreContext);

    return (
        <div className="cart-popup">
            <h3>Sản Phẩm Mới Thêm</h3>
            <ul>
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <li className="cart-item" key={index}>
                                <img className="cart-item-image" src={url + "/images/" + item.image} alt={item.name} />
                                <div className="cart-item-info">
                                    <div className="cart-item-header">
                                        <p className="cart-item-name">{item.name}</p>
                                        <p className="cart-item-price">{item.price * cartItems[item._id]}đ</p>
                                    </div>
                                    <p className="cart-item-quantity">Số lượng: {cartItems[item._id]}</p>
                                </div>
                            </li>
                        );
                    }
                    return null;
                })}
                {getTotalCartAmount()=== 0 && <p>Bạn chưa thêm sản phẩm nào</p>}
            </ul>
            {getTotalCartAmount()!== 0 &&
                <Link to="/cart">
                    <button className="view-cart-button">Xem giỏ hàng</button>
                </Link>
            }
        </div>
    );
};

export default CartPopup;