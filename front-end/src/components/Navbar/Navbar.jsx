import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");

    const { getTotalCartAmount } = useContext(StoreContext)

    return (
        <div className='navbar'>
            <Link to='/'><h1>Nhom11</h1></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={(menu === "home") ? "active" : ""}>Trang chủ</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={(menu === "menu") ? "active" : ""}>Thực đơn</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={(menu === "contact-us") ? "active" : ""}>Liên hệ</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className='navbar-search-icon'>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>

                </div>
                <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
            </div>
        </div>
    )
}

export default Navbar
