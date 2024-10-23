// CreateRxGroupModal.js
import React, { useState } from 'react';
import Modal from '../../Components/PopupModels/Model';
import SaveButton from '../../Components/Buttons/SaveButton';
import { Box } from '@mui/material';
import axios from 'axios';

const CreateRxGroupModal = ({ show, onClose, doctorId, setShowModal }) => {
  const [newGroup, setNewGroup] = useState('');

  const handleCreateRxGroup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/rx_group/post_rx', {
        rx_group_name: newGroup,
        doctor_id: doctorId
      });

      if (response.status === 200) {
        setShowModal(false);
      } else {
        console.error('Error fetching RX data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Box className='popuptitle'>CREATE RX GROUP</Box>
      <Box className='createrx'>
        <Box className="rxGroupName">RX Group Name</Box>
        <Box className='createinput'>
          <input
            type="text"
            id="rxGroupName"
            placeholder="Enter Group Name"
            className="input-field"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
        </Box>
      </Box>
      <Box className='popup-buttom'>
        <Box onClick={handleCreateRxGroup}><SaveButton /></Box>
      </Box>
    </Modal>
  );
};

export default CreateRxGroupModal;
