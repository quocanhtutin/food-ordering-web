import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart } = useContext(StoreContext);

  useEffect(() => {
    document.title = 'Giỏ hàng';
  }, []);

  return (
    <div className='cart'>
      {Object.keys(cartItems).length !== 0 &&
        <div className='cart-items'>
          <div className="cart-items-title">
            <p>Sản phẩm</p>
            <p>Đơn giá</p>
            <p>Số lượng</p>
            <p>Thành tiền</p>
          </div>
          <ul className='cart-items-list'>
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <li className="cart-item" key={index}>
                    <img className="cart-item-image" src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">${item.price}</p>
                      <p className="cart-item-quantity">{cartItems[item._id]}</p>
                      <p className="cart-item-total-price">${item.price * cartItems[item._id]}</p>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      }
      {Object.keys(cartItems).length === 0 &&
        <div className="empty-cart">
          <img src={assets.empty_cart} alt="empty cart" />
          <p>Giỏ hàng của bạn đang trống</p>
          <Link to="/#explore-menu"><button className='buy-now'>Mua ngay</button></Link>
        </div>
      }
      <br />
      <hr />
    </div>
  );
};

export default Cart;
