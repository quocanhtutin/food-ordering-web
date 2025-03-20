import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import CartPopup from '../CartPopup/CartPopup';
import { StoreContext } from '../../context/StoreContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {

    // const [menu, setMenu] = useState("home");

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const { cartItems, food_list, addToCart } = useContext(StoreContext);
    const location = useLocation();


    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    useEffect(() => {
        console.log(getTotalCartAmount());
    }, [cartItems]);


    return (
        <div className='navbar'>
            <Link to='/'><h1>Nhóm11</h1></Link>
            {/* <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={(menu === "home") ? "active" : ""}>Trang chủ</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={(menu === "menu") ? "active" : ""}>Thực đơn</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={(menu === "contact-us") ? "active" : ""}>Liên hệ</a>
            </ul>
            <div className="navbar-right">
                <div className='navbar-search-icon'>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>

                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Đơn hàng</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Đăng xuất</p></li>
                        </ul>
                    </div>}

            </div> */}

            {/*location.pathname !== '/cart' && location.pathname !== '/payment'
                &&
                <div className="search-bar-container">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Hôm nay ăn gì?"
                            onFocus={() => setShowSuggestion(true)}
                            onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    setShowSuggestion(false);
                                } else {
                                    setShowSuggestion(true);
                                }
                            }}

                        />
                        <button>
                            <img src={assets.search_icon} alt="search icon" />
                        </button>
                    </div>
                    {showSuggestion && (
                        <div className="suggestion-item"
                            onClick={() => {
                                const randomItem = food_list[Math.floor(Math.random() * food_list.length)];
                                addToCart(randomItem._id);
                                setShowSuggestion(false);
                            }}>
                            ăn gì cũng được
                        </div>
                    )}
                </div>*/}
            <div className="navbar-right">
                {location.pathname !== '/cart' && location.pathname !== '/payment' && (
                    <div className="navbar-basket-icon" onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}>
                        <Link to="/cart">
                            {getTotalCartAmount() === 0 ? <img src={assets.basket_icon} alt="" />
                                : <img src={assets.basket_icon_full} alt="" />}
                        </Link>
                        {isHovering && <CartPopup />}
                    </div>
                )}
                {!token ? <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar
