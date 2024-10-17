import React from 'react'
import './Login.css';

function Login() {
  return (
    <div className='Login'>
        <div className='left'>
        </div>
        <div className='right'>
            <div className='login-container'>
            <div className='container1'>
            <div className='container'>
            <div className='logo'></div>
            <div className='welcome'>Welcome</div>
            </div>
            <div className='input-feild'>
            <div className='label-input'>
            <label>Email</label>
            <input type="text" id="username" name="username" required />
            </div>
            <div className='label-input'>
            <label>Password</label>
            <input type="password" id="password" name="password" required />
            </div>
            </div>
            <div className='container'>
            <div className='forget'>Forgot Password?</div>
            <button className='sign-in'>
            <p>Sign in</p>
            </button> 
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login