import React, { useState } from 'react';
import SaveButton from '../../../Components/Buttons/SaveButton';
import { Box } from '@mui/material';
import axios from 'axios';
import './Dose.css'

const DoseModal = ({ show, onClose }) => {
  const [changeGroupName, setChangeGroupName] = useState('');
  if (!show) {
    return null;
  }

  return (
    <div className="dose-modal-overlay" onClick={onClose}>
      <div className="dose-modal-content" onClick={(e) => e.stopPropagation()}>
      <Box className='dose-popuptitle'>Dose</Box>
      <button className="dose-close-button" onClick={onClose}>&times;</button>

      <Box className='dose-createrx'>
        <Box className='dose-createinput'>
          <Box className='dose-block'>
            <Box>Morning</Box>
            <Box>
            <Box><button>0</button></Box>
            <Box><button>1</button></Box>
            </Box>
          </Box>
          <Box className='dose-block'>
            <Box>Afternoon</Box>
            <Box>
            <Box><button>0</button></Box>
            <Box><button>1</button></Box>
            </Box>
          </Box>
          <Box className='dose-block'>
            <Box>Night</Box>
            <Box>
            <Box><button>0</button></Box>
            <Box><button>1</button></Box>
            </Box>
          </Box>

        </Box>
      </Box>
      <Box className='dose-popup-buttom'>
        <Box><SaveButton /></Box>
      </Box>
      </div>
      </div>
  );
};

export default DoseModal;
