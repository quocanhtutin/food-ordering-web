import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import CartPopup from '../CartPopup/CartPopup'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({ setShowLogin }) => {

    // const [menu, setMenu] = useState("menu");
    const [isHovering, setIsHovering] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const {cartItems, food_list, addToCart } = useContext(StoreContext);

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="" className="logo" />
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
            </div>
            <div className="navbar-right">
                <div className="navbar-basket-icon" onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}>
                    <img src={assets.basket_icon} alt="" />
                    {Object.keys(cartItems).length!==0&&<div className="dot"></div>}
                    {isHovering && <CartPopup />}
                </div>
                <button onClick={() => setShowLogin(true)}>Sign in</button>
            </div>
        </div>
    )
}

export default Navbar
