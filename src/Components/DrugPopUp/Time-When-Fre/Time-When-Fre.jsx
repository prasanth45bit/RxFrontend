import React, { useState } from 'react';
import SaveButton from '../../../Components/Buttons/SaveButton';
import { Box } from '@mui/material';
import axios from 'axios';
import './Time-When-Fre.css'

const TimeWhenFrequencyModal = ({ show, onClose, renameId }) => {
  const [changeGroupName, setChangeGroupName] = useState('');


  if (!show) {
    return null;
  }

  return (
    <div className="twf-modal-overlay" onClick={onClose}>
      <div className="twf-modal-content" onClick={(e) => e.stopPropagation()}>
      <Box className='popuptitle'>Time, When, Frequency</Box>
      <button className="close-button" onClick={onClose}>&times;</button>
      <Box className='createrx'>
        <Box className="rxGroupName">RX Group Name</Box>
        <Box className='createinput'>
          
        </Box>
      </Box>
      <Box className='popup-buttom'>
        <Box><SaveButton /></Box>
      </Box>
      </div>
    </div>
  );
};

export default TimeWhenFrequencyModal;
