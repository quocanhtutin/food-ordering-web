import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        const response = await axios.post("http://localhost:4000/api/admin/login", data);

        if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            navigate("/");
        }
        else {
            alert(response.data.message)
        }
    };


    return (
        <div className='login'>
            <form className="login-container" onSubmit={onSubmitHandler}>
                <div className="login-title">
                    <h2>Vui lòng đăng nhập để tiếp tục</h2>
                </div>
                <div className="login-inputs">
                    <input className='email' name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
                    <input className='password' name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Mật khẩu' required />
                </div>
                <button type='submit'>Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
