import React, {useState} from 'react';
import './Active.css';
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ActiveModal = ({ show, onClose, status, id, groupname, setShowActiveModal }) => {
  const [isChecked, setIsChecked] = useState(status);
  const [error, setError] = useState(null);

  if (!show) {
    return null;
  }

  const handleToggle = async () => {
    const newStatus = !isChecked;
    try {
      const response = await axios.post('http://localhost:5000/rx_group/rx_active', {
        rx_group_id: id,
        active: newStatus,
      });

      if (response.status === 200) {
        setIsChecked(newStatus);
        setShowActiveModal(false); 
      } else {
        setError('Error updating RX data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating RX data.');
    }
  };

  return (
    <div className="active-modal-overlay" onClick={onClose}>
      <div className="active-modal-content" onClick={(e) => e.stopPropagation()}>
        <Box className="modal-container">
          <Box className="text1">Are you sure?</Box>
          <Box className="text">
            <Box className="text1">Do you want to {status ? 'IN-ACTIVATE' : 'ACTIVATE'}</Box>
            <Box className="text1">Rx Group: {groupname}</Box>
          </Box>
          <Box className="buttons">
            <button className="cancel-button" onClick={() => setShowActiveModal(false)}>CANCEL</button>
            <button className="inactive-button" onClick={handleToggle}>{status ? 'IN-ACTIVATE' : 'ACTIVATE'}</button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ActiveModal;
