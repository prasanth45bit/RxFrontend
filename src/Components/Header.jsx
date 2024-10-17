import React from 'react'
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import './Header.css'

function Header() {
  return (
    <div className='Header-page'>
        <div className='part1'>
            <div className='backicon'><IoIosArrowBack /></div>
            <div className='Rx-title'>Rx Group</div>
        </div>
        <div className='part2'>
            <div className='profile'><CgProfile /></div>
        </div>
    </div>
  )
}

export default Header