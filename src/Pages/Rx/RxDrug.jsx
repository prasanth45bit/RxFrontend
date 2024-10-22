import React, { useState, useEffect } from 'react';
import Header2 from '../../Components/Header2';
import './RxDrug.css';
import { Box } from '@mui/material';
import LimitTags from '../../Components/Search';
import CustomTable from '../../Components/Table';
import { useNavigate } from "react-router-dom";
import { useDataContext } from '../../Components/Datacontaxt';

function RxDrug() {
  const navigate = useNavigate();
  const { SelectedRx, setSelectedRx } = useDataContext();
  const [selectedData, setSelectedData] = useState([null]);
  const [selectedRxGroup, setSelectedRxGroup] = useState(SelectedRx || []);

  useEffect(() => {
    setSelectedRxGroup(SelectedRx || []);
  }, [SelectedRx]);

  const groupName = selectedRxGroup.length > 0 ? selectedRxGroup[0]?.name || 'No name available' : 'No Rx Group Selected';

  return (
    <Box className='RxDrug'>
      <Box className='header2'>
        <Box className='Headerpage2'>
          <Header2 GroupName={groupName} />
        </Box>
      </Box>

      <Box className='page'>
        <Box className='Main-container'>
          <Box className='search-bar'>
            <LimitTags setSelectedData={setSelectedData} />
          </Box>

          <Box className='showSelectedData'>
            {selectedData.length > 0 ? (
              <Box className='table-main'>
                <Box className='drug-count'>Selected Drugs ({selectedData.length})</Box>
                <Box className='data-table'><CustomTable selectedData={selectedData} /></Box>
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
