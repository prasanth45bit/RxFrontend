import React, { useEffect, useState } from 'react';
import './Table.css'; 
import { Box } from '@mui/material';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import DeleteModal from '../Delete/Delete';
import { IoChevronForward } from "react-icons/io5";
import DoseModal from '../DrugPopUp/Dose/Dose';
import TimeWhenFrequencyModal from '../DrugPopUp/Time-when-fre/Time-When-Fre';
import DurationQuantityModal from '../DrugPopUp/Druration-Quantity/Duration-Quantity';

export default function CustomTable({ groupId, render, setRender }) {
  const [tableData, setTableData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]); 
  const [product, setProduct] = useState(['']);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDrugInfo, setSelectedDrugInfo] = useState([]);
  const [showTimeWhenFrequencyModal, setShowTimeWhenFrequencyModal] = useState(false);
  const [showDoseModal, setShowDoseModal] = useState(false);
  const [showDurationQuantityModal, setShowDurationQuantityModal] = useState(false);
  const [num, setNum] = useState(0);

  const GroupId = groupId;

  const handleDeleteClick = (drugId, drugname, drugvarient) => {
    setSelectedDrugInfo([drugId, drugname, drugvarient]); 
    setShowDeleteModal(true);
  };

  const fetchExistingData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/rx_group/get_specific_rx_drug', { rx_group_id: GroupId });

      if (response.status === 200 && response.data?.Rx_group_drugs) {
        const rxDatas = response.data.Rx_group_drugs.map(item => ({
          title: `${item?.Drug_varient?.drug?.drug_name || 'Unknown Drug'} ${item?.Drug_varient?.drug_varient || ''}`,
          id: item?.id || 'Unknown ID',
          drugid: item.drug_varient_id,
          doseM: item?.dose_m || 0,
          drugname: item.Drug_varient.drug.drug_name,
          doseAN: item?.dose_an || 0,
          doseN: item?.dose_n || 0,
          quantity: item?.quantity || 0,
          variant: item?.Drug_varient?.drug_varient || 'N/A',
          time: item?.drugTime?.time || 'N/A',
          when: item?.drugWhen?.when || 'N/A',
          frequency: item?.drugFrequency?.frequency || 'N/A',
          duration: `${item?.drugDuration?.duration_count || 0} ${item?.drugDuration?.duration_type || 'days'}`,
        }));

        if (JSON.stringify(rxDatas) !== JSON.stringify(fetchedData)) {
          setFetchedData(rxDatas);
          setTableData(rxDatas);
        }
      } else {
        console.error('Error fetching existing data or no Rx_group_drugs found');
      }
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };


  const handleChangeDrugDoseValue = (item) => {
    setProduct(item);
      setShowDoseModal(true);
  };
  const handleChangeDrugTWFValue = (item) => {
    setProduct(item);
      setShowTimeWhenFrequencyModal(true);
  };
  const handleChangeDrugDQValue = (item) => {
    setProduct(item);
    setShowTimeWhenFrequencyModal(true);
  };

  useEffect(() => {
    if (render === 1) {
      fetchExistingData();
      setRender(0);
    }
  }, [render]);

  const refreshData = () => {
    fetchExistingData();
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
                  <Box className='tabledname'>{item.drugname} {item.variant}</Box> 
                  <Box className='tableddose'>{item?.doseM} - {item?.doseAN} - {item?.doseN} <IoChevronForward onClick={() => handleChangeDrugDoseValue(item)} /></Box> 
                  <Box className='tabledtfw'>{item?.time}, {item?.frequency}, {item?.when} <IoChevronForward onClick={() => handleChangeDrugTWFValue(2, item)} /></Box> 
                  <Box className='tableddura'>{item?.duration}, {item.quantity} nons <IoChevronForward onClick={() => handleChangeDrugDQValue(3, item)} /></Box> 
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
      
      <TimeWhenFrequencyModal
        rx_group_id={GroupId}
        drug_info={product}
        show={showTimeWhenFrequencyModal}
        setShowTimeWhenFrequencyModal={setShowTimeWhenFrequencyModal}
        onClose={() => setShowTimeWhenFrequencyModal(false)}
      />
      <DoseModal
        rx_group_id={GroupId}
        drug_info={product}
        show={showDoseModal}
        setShowDoseModal={setShowDoseModal}
        onClose={() => setShowDoseModal(false)}
      />
      <DurationQuantityModal
        rx_group_id={GroupId}
        drug_info={product}
        show={showDurationQuantityModal}
        setShowDurationQuantityModal={setShowDurationQuantityModal}
        onClose={() => setShowDurationQuantityModal(false)}
      />
    </Box>
  );
}
