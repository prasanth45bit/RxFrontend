import React, { useState } from 'react';
import SaveButton from '../../../Components/Buttons/SaveButton';
import { Box } from '@mui/material';
import axios from 'axios';
import './Duration-Quantity.css'

const DurationQuantityModal = ({ rx_group_id, drug_info, show, setShowDurationQuantityModal,onClose, }) => {
    const [changeGroupName, setChangeGroupName] = useState('');

    if (!show) {
        return null;
      }

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
      <Box className='popuptitle'>Duration, Quantity</Box>
      <button className="close-button" onClick={onClose}>&times;</button>
      <Box className='createrx'>
        <Box className="rxGroupName">RX Group Name</Box>
        <Box className='createinput'>
          <input
            type="text"
            id="rxGroupName"
            value={changeGroupName}
            placeholder="Enter new group name"
            className="input-field"
            onChange={(e) => setChangeGroupName(e.target.value)}
          />
        </Box>
      </Box>
      <Box className='popup-buttom'>
      <button className="cancel-button" onClick={() => setShowDurationQuantityModal(false)}>CANCEL</button>
        <Box><SaveButton /></Box>
      </Box>
      </div>
      </div>
  );
};

export default DurationQuantityModal;
