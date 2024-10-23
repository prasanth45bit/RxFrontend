import React, { useState } from 'react';
import Modal from '../../Components/PopupModels/Model';
import SaveButton from '../../Components/Buttons/SaveButton';
import { Box } from '@mui/material';
import axios from 'axios';
import './Rename.css'

const RenameRxGroupModal = ({ show, onClose, renameId }) => {
  const [changeGroupName, setChangeGroupName] = useState('');

  const handleChangeGroupName = async () => {
    try {
      const response = await axios.put('http://localhost:5000/rx_group/rename_rx', {
        rx_group_id: renameId,
        new_name: changeGroupName
      });

      if (response.status === 200) {
        onClose(); 
      } else {
        console.error('Error fetching RX data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Box className='popuptitle'>RENAME RX GROUP</Box>
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
        <Box onClick={handleChangeGroupName}><SaveButton /></Box>
      </Box>
    </Modal>
  );
};

export default RenameRxGroupModal;
