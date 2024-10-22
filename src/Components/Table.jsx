import React, { useEffect, useState } from 'react';
import './Table.css'; 
import { Box } from '@mui/material';
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function CustomTable({ selectedData }) {
  const [tableData, setTableData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]); 

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const rx_group_id = 1; 
        const response = await axios.post('http://localhost:5000/rx_group/get_specific_rx_drug', { rx_group_id });

        if (response.status === 200 && response.data?.Rx_group_drugs) {
          const rxDatas = response.data.Rx_group_drugs.map(item => ({
            title: `${item?.Drug_varient?.drug?.drug_name || 'Unknown Drug'} ${item?.Drug_varient?.drug_varient || ''}`,
            id: item?.id || 'Unknown ID',
            doseM: item?.dose_m || 0,
            doseAN: item?.dose_an || 0,
            doseN: item?.dose_n || 0,
            variant: item?.Drug_varient?.drug_varient || 'N/A',
            time: item?.drugTime?.time || 'N/A',
            when: item?.drugWhen?.when || 'N/A',
            frequency: item?.drugFrequency?.frequency || 'N/A',
            duration: `${item?.drugDuration?.duration_count || 0} ${item?.drugDuration?.duration_type || 'days'}`,
          }));

          setFetchedData(rxDatas);
          setTableData(rxDatas);
        } else {
          console.error('Error fetching existing data or no Rx_group_drugs found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchExistingData();
  }, []);

  useEffect(() => {
    if (selectedData.length > 0) {
      setTableData(prevData => {
        const updatedData = [...prevData];
        selectedData.forEach(newItem => {
          const exists = updatedData.find(item => item?.title === newItem?.title && item?.variant === newItem?.variant);
          if (!exists) {
            updatedData.push(newItem);
          }
        });

        return updatedData;
      });
    }
  }, [selectedData]);

  const handleDelete = (itemToDelete) => {
    setTableData(prevData => prevData.filter(item => item?.id !== itemToDelete?.id));
  };

  return (
    <Box className="table-container">
      <Box className="custom-table">
        <Box className='table-head'>
            <Box className='tabledname'>Drug Name</Box>
            <Box className='tableddose'>Dose</Box>
            <Box className='tabledtfw'>Time, Frequency & When</Box>
            <Box className='tableddura'>Duration & Quantity</Box>
            <Box className='tabledaction'></Box>
        </Box>
        <Box className='newtable'>
          {tableData.length === 0 ? (
            <Box>
              <Box colSpan="5">No data available</Box>
            </Box>
          ) : (
            tableData.map((item, index) => (
              item ? ( 
                <Box className='table-value' key={index}>
                  <Box className='tabledname'>{item?.title}</Box> 
                  <Box className='tableddose'>{item?.doseM}-{item?.doseAN}-{item?.doseN}</Box> 
                  <Box className='tabledtfw'>{item?.time}, {item?.frequency}, {item?.when}</Box> 
                  <Box className='tableddura'>{item?.duration}</Box> 
                  <Box className='tabledaction'>
                    <Box className='action-icon' sx={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item)}>
                      <MdDelete />
                    </Box>
                  </Box>
                </Box>
              ) : null 
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}