import React from 'react'
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import './Header.css'
import { Box } from '@mui/material';
import SaveButton from './SaveButton';
import { useNavigate } from "react-router-dom";

function Header2({GroupName}) {
  const navigate =useNavigate()
  return (
    <Box className='Header-page'>
        <Box className='part1'>
            <Box className='backicon'  onClick={() => navigate('/Rx')}><IoIosArrowBack /></Box>
            <Box className='Rx-title'>{GroupName} -Add Drugs</Box>
        </Box>
        <Box className='part3'>
            <Box  onClick={() => navigate('/Rx')}> <SaveButton/></Box>
        </Box>
    </Box>
  )
}

export default Header2