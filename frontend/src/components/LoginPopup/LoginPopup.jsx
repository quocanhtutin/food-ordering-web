import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
const LoginPopup = ({ setShowLogin }) => {

    const [curState, setCurState] = useState("Login");

    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curState === "Login" ? "Đăng nhập" : curState === "Forgot password" ? "Quên mật khẩu" : "Đăng ký"}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                </div>
                <div className="login-popup-inputs">
                    {curState === "Sign Up" &&
                        <div className='sign-up'>
                            <input type="text" placeholder="Tên" required />
                            <input className='email' type="text" placeholder="Email" required />
                            <input className='password' type="password" placeholder="Mật khẩu" required />
                        </div>
                    }
                    
                    {curState === "Forgot password" &&
                        <div className="forgot-password">
                            <input className='email' type="text" placeholder="Email" required />
                            <p>Nhập mật khẩu bạn đã quên:</p>
                            <input className='password' type="password" placeholder="Mật khẩu" required />
                        </div>
                    }
                    {curState === "Login" &&
                        <div className="login">
                            <input className='email' type="text" placeholder="Email" required />
                            <input className='password' type="password" placeholder="Mật khẩu" required />
                        </div>
                    }
                </div>
                <button>{curState === "Sign Up" ? "Đăng ký" : "Đăng nhập"}</button>
                {curState === "Login"
                    ? <div className='create-forgot'>
                        <span onClick={() => setCurState("Forgot password")} className='forgot-pass'>Quên mật khẩu</span>
                        <p>Chưa có tài khoản? <span onClick={() => setCurState("Sign Up")}>Đăng ký ngay</span> </p>
                    </div>
                    : <p className='lg'>Đã có tài khoản? <span onClick={() => setCurState("Login")}>Đăng nhập</span></p>}

            </form>
        </div>
    )
}

export default LoginPopup
