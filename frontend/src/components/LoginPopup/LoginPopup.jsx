import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
const LoginPopup = ({ setShowLogin }) => {

    const [curState, setCurState] = useState("Login");

    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                </div>
                <div className="login-popup-inputs">
                    {curState === "Sign Up" && <input type="text" placeholder="Name" required />}
                    <input type="text" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                </div>
                <button>{curState === "Login" ? "Login" : "Create account"}</button>
                {curState === "Login"
                    ? <p>Don't have account? <span onClick={()=>setCurState("Sign Up")}>Create now</span> </p>
                    : <p>Already have an account?<span onClick={()=>setCurState("Login")}>Login here</span></p>}
                
            </form>
        </div>
    )
}

export default LoginPopup
