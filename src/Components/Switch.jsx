import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';
import axios from 'axios';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FFFFFF', 
    '&:hover': {
      backgroundColor: 'rgba(0, 198, 174, 0.1)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#007965', 
  },
  '& .MuiSwitch-switchBase': {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: '#bdbdbd',
    opacity: 1,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8, <svg height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const ToggleSwitch = ({ status, id }) => {
  const [isChecked, setIsChecked] = useState(status);
  const [error, setError] = useState(null);

  const handleToggle = async () => {
    const newStatus = !isChecked;
    try {
      const response = await axios.post('http://localhost:5000/rx_group/rx_active', {
        rx_group_id: id,
        active: newStatus, 
      });

      if (response.status === 200) {
        setIsChecked(newStatus); 
      } else {
        setError('Error updating RX data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating RX data.');
    }
  };

  return (
    <FormControlLabel
      control={<Android12Switch checked={isChecked} onChange={handleToggle} />}
    />
  );
};

export default ToggleSwitch;
