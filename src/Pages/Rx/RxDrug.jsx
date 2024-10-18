import React, { useState } from 'react';
import Header2 from '../../Components/Header2';
import './RxDrug.css';
import { Box } from '@mui/material';
import LimitTags from '../../Components/Search';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomTable from '../../Components/Table';
import { useNavigate } from "react-router-dom";


function RxDrug() {

  const navigate =useNavigate()
  const [selectedData, setSelectedData] = useState([]);

  return (
    <Box className='RxDrug'>
      <Box className='header2'>
        <Box className='Headerpage2'><Header2 /></Box>
      </Box>

      <Box className='page'>
        <Box className='Main-container'>
          <Box className='search-bar' >
              <LimitTags setSelectedData={setSelectedData} />
          </Box>

          <Box className='showSelectedData'>

            {selectedData.length > 0 ? (
                <Box className='table-main'>
                    <Box className='drug-count'>Selected Drugs {selectedData.length}</Box>
                    <Box className='data-table'><CustomTable/></Box>
              </Box>
            ) : (
              <p>No data selected</p>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RxDrug;
