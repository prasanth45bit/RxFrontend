import React, { useState } from 'react';
import './Delete.css';
import { Box } from '@mui/material';
import axios from 'axios';

const DeleteModal = ({ show, onClose, rx_group_id, drug_info, setShowDeleteModal }) => {
  const [error, setError] = useState(null);

  const [drugId, drugName, drugVariant] = drug_info || ['', '', ''];


  if (!show) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const response = await axios.post('http://localhost:5000/rx_group/del_rx_drug', {
        rx_group_id: rx_group_id,
        drug_varient_id: drugId
      });

      if (response.status === 200) {
        console.log('Success');
        setShowDeleteModal(false); 
      } else {
        setError('Error fetching RX data');
      }
    } catch (error) { 
      console.error('Error:', error);
      setError('An error occurred while fetching RX data.');
    }
  };

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <Box className="delete-modal-container">
          <Box className="text1">Are you sure?</Box>
          <Box className="text">
            <Box className="text1">Do you want to Delete</Box>
            <Box className="text1">{drugName} {drugVariant}</Box>
          </Box>
          {error && <Box className="error-message">{error}</Box>}
          <Box className="buttons">
            <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>CANCEL</button>
            <button className="inactive-button" onClick={handleDelete}>Delete</button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default DeleteModal;
