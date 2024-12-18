import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Thêm món ăn</p>
                </NavLink>
                <NavLink to='/list' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Danh sách món</p>
                </NavLink>
                <NavLink to='/orders' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Danh sách đặt hàng</p>
                </NavLink>
                <NavLink to='/listUsers' className="sidebar-option">
                    <img src={assets.profile_icon} alt="" />
                    <p>Danh sách tài khoản thành viên</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
