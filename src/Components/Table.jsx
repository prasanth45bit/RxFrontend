import React from 'react';
import './Table.css'; 
import { Box } from '@mui/material';
import { MdDelete } from "react-icons/md";

export default function CustomTable() {
  const rows = [
    { name: 'Paracetamol 250mg', dose: '1 - 0 - 1', time: '5 min, Daily, Before food', duration: '+ Customize' },
    { name: 'T.Razo 20mg', dose: '0 - 1/2 - 0', time: '10 min, Daily, After food', duration: '3 days, 3 nos' },
    { name: 'T.Shelcal 500mg', dose: '0 - 1 - 0', time: '10 min, Daily, After food', duration: '3 days, 3 nos' }    
  ];

  return (
    <Box className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Dose</th>
            <th>Time, Frequency & When</th>
            <th>Duration & Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.dose}</td>
              <td>{row.time}</td>
              <td>
                <button className="duration-button">{row.duration}</button>
              </td>
              <td>
              <Box className='action-icon' sx={{color:'red'}}><MdDelete /></Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
