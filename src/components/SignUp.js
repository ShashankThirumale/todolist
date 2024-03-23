import React, {useState } from 'react'
import './LoginSignUp.css'
import emailIcon from "./Assets/Images/email.png"
import passwordIcon from "./Assets/Images/password.png"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'


export const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/register', {
          email: email,
          password: password,
        }).then((response) => {
            console.log(response);
        });
        setMessage("You have been signed up and can now Login")
        
      };
    const redirect = () => {
        navigate('/');
    }
    return (
        <div className='LoginWrapper'>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit} className="LoginForm">
                <div className='input'>
                    <img src={emailIcon} alt = ''/>
                    <input type='text' className='login-input' placeholder='Email iD' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <img src={passwordIcon} alt='' />
                    <input type='password' className = 'login-input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className='login-btn'>SignUp</button>
            </form>
            <button className='login-btn' onClick={redirect}>Login</button>
            <h4>{message}</h4>
        </div>
    )
}