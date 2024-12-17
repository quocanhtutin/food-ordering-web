import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <h1>Nhom11</h1>
                <p>Quản lý cửa hàng</p>
            </div>
            {/* <img className='profile' src={assets.profile_image} alt="" /> */}
        </div>
    )
}

export default Navbar
