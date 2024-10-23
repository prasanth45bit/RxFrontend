import React, { useEffect, useState } from 'react';
import './Table.css'; 
import { Box } from '@mui/material';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import DeleteModal from '../Delete/Delete';
export default function CustomTable({ groupId, selectedData }) {
  const [tableData, setTableData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]); 
  const [GroupId, setGroupId] = useState(groupId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDrugInfo, setSelectedDrugInfo] = useState([]);

  const handleDeleteClick = (drugId, drugname, drugvarient) => {
    setSelectedDrugInfo([drugId, drugname, drugvarient]); 
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const rx_group_id = GroupId; 
        const response = await axios.post('http://localhost:5000/rx_group/get_specific_rx_drug', { rx_group_id });

        if (response.status === 200 && response.data?.Rx_group_drugs) {
          const rxDatas = response.data.Rx_group_drugs.map(item => ({
            title: `${item?.Drug_varient?.drug?.drug_name || 'Unknown Drug'} ${item?.Drug_varient?.drug_varient || ''}`,
            id: item?.id || 'Unknown ID',
            drugid: item.drug_varient_id,
            doseM: item?.dose_m || 0,
            drugname: item.Drug_varient.drug.drug_name,
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
  }, [tableData]);

 
 
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
                  <Box className='tabledname'>{item.drugname} {item.variant}</Box> 
                  <Box className='tableddose'>{item?.doseM} - {item?.doseAN} - {item?.doseN}</Box> 
                  <Box className='tabledtfw'>{item?.time}, {item?.frequency}, {item?.when}</Box> 
                  <Box className='tableddura'>{item?.duration}</Box> 
                  <Box className='tabledaction'>
                    <Box 
                      className='action-icon' 
                      sx={{ color: 'red', cursor: 'pointer' }} 
                      onClick={() => handleDeleteClick(item.drugid, item.drugname, item.variant)}
                    >
                      <MdDelete />
                    </Box>
                  </Box>
                </Box>
              ) : null 
            ))
          )}
        </Box>
      </Box>
      <DeleteModal
  rx_group_id={GroupId}
  drug_info={selectedDrugInfo}
  show={showDeleteModal}
  setShowDeleteModal={setShowDeleteModal}
  onClose={() => setShowDeleteModal(false)}
/>
    </Box>
  );
}
