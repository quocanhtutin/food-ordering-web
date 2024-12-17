import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Gọi món ngon ngay tại đây!</h2>
                <p>Lựa chọn với thực đơn đa dạng từ Bắc Trung Nam</p>
                <a href='#explore-menu'><button>Mở thực đơn</button></a>
            </div>
        </div>
    )
}

export default Header
