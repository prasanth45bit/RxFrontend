import React, { useState } from 'react';
import './Login.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/rx_group/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        // Store the response data in local storage
        localStorage.setItem('doctorData', JSON.stringify(response.data));
        navigate('/Rx');
  
        // Retrieve the data from local storage
        const doctorData = localStorage.getItem('doctorData');
        if (doctorData) {
          const parsedData = JSON.parse(doctorData);
          console.log(parsedData.doctor.id); 
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };
  

  return (
    <Box className='Login'>
      <Box className='left'></Box>
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
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box className='label-input'>
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
            </Box>
            {error && <Box className='error-message'>{error}</Box>}
            <Box className='container'>
              <Box className='forget'>Forgot Password?</Box>
              <button className='sign-in' onClick={handleLogin}>
                <p>Sign in</p>
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
