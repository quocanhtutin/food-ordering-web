import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken, setUserName, setUserEmail } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            setUserName(response.data.userName);
            setUserEmail(response.data.userEmail);
            console.log(response.data.userName, response.data.userEmail)
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }

    }





    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState==="Login"?"Đăng nhập":"Đăng ký"}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên' required />}
                    <input className='email' name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
                    <input className='password' name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Mật khẩu' required />
                </div>
                <button type='submit'>{currState === 'Sign up' ? 'Tạo tài khoản' : 'Đăng nhập'}</button>
                {/* <div className="login-popup-condition">
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div> */}
                {currState === "Login"
                    ?
                    <p>Chưa có tài khoản? <span onClick={() => setCurrState("Sign up")}>Đăng ký ngay</span></p>
                    :
                    <p>Đã có tài khoản?<span onClick={() => setCurrState("Login")}>Đăng nhập ngay</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
