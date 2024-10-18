import React from 'react'
import './Login.css';
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
function Login() {


  const navigate =useNavigate()
  return (
    <Box className='Login'>
        <Box className='left'>
        </Box>
        <Box className='right'>
            <Box className='login-container'>
            <Box className='container1'>
            <Box className='container'>
            <Box className='logo'></Box>
            <Box className='welcome'>Welcome</Box>
            </Box>
            <Box className='input-feild'>
            <Box className='label-input'>
            <label>Email</label>
            <input type="text" id="username" name="username" required />
            </Box>
            <Box className='label-input'>
            <label>Password</label>
            <input type="password" id="password" name="password" required />
            </Box>
            </Box>
            <Box className='container'>
            <Box className='forget'>Forgot Password?</Box>
            <button className='sign-in' onClick={() => navigate('/Rx')}>
            <p>Sign in</p>
            </button> 
            </Box>
            </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Login