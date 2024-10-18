import React from 'react'
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import './Header.css'
import { Box } from '@mui/material';
import SaveButton from './SaveButton';

function Header2() {
  return (
    <Box className='Header-page'>
        <Box className='part1'>
            <Box className='backicon'><IoIosArrowBack /></Box>
            <Box className='Rx-title'>Rx Group Name -Add Drugs</Box>
        </Box>
        <Box className='part3'>
            <Box> <SaveButton/></Box>
        </Box>
    </Box>
  )
}

export default Header2