import React, { useState } from 'react'
import './LoginSignUp.css'
import emailIcon from "./Assets/Images/email.png"
import passwordIcon from "./Assets/Images/password.png"
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'



export const Login = (props) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState('');
    
    const login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/login", {
            username: email,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                if (response.data.message === "User doesn't exist") {
                    setLoginStatus(response.data.message + ' try again or SignUp');
                } else {
                    setLoginStatus(response.data.message);
                }
            } else {
                console.log("Success!");
                navigate('/TodoList', { state: { email: email } });
            }
        });
    };
    const redirect = () => {
        navigate("/signUp")
    }
    return (
       
        <div className='LoginWrapper'>
            <h1>Login</h1>
            <form onSubmit={login} className="LoginForm">
                <div className='input'>
                    <img src={emailIcon} alt = ''/>
                    <input type='text' className='login-input' placeholder='Email iD' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={passwordIcon} alt='' />
                    <input type='password' className = 'login-input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className='login-btn' onClick={login}>Login</button>
            </form>
            <button className='login-btn' onClick={redirect}>SignUp</button>
            <h4>{loginStatus}</h4>
        </div>
    )
}
