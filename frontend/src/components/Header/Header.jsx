import React from 'react'
import './Header.css'
const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Hust Food</h2>
                <p>Thèm món gì - Đặt ngay món đó</p>
                <a href='#explore-menu'><button>Đặt hàng ngay</button></a>
                
            </div>
        </div>
    )
}

export default Header
