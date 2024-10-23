import React from 'react'
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import './Header.css'
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate =useNavigate()
  return (
    <Box className='Header-page'>
        <Box className='part1'>
            <Box className='backicon'  onClick={() => navigate('/')}><IoIosArrowBack /></Box>
            <Box className='Rx-title'>Rx Group</Box>
        </Box>
        <Box className='part2'>
            <Box className='profile'  onClick={() => navigate('/Profile')}><CgProfile /></Box>
        </Box>
    </Box>
  )
}

export default Header