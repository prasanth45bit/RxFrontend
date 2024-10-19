import Header from '../../Components/Header';
import { GoPlusCircle } from "react-icons/go";
import './Rx.css';
import React, { useState, useEffect } from 'react';
import Modal from '../../Components/Model';
import { IoSearch } from "react-icons/io5";
import { Box } from '@mui/material';
import ToggleSwitch from '../../Components/Switch';
import { CgRename } from "react-icons/cg";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import SaveButton from '../../Components/SaveButton';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Rx() {
  const navigate = useNavigate();
  const [RxData, setRxData] = useState([]);
  const [RxDataDrug, setRxDataDrug] = useState([]);
  const [data, setData] = useState([]); // Corrected state name to setData
  const [isOpen, setIsOpen] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [error, setError] = useState(null); // Added error state for handling errors

  const doctorData = localStorage.getItem('doctorData');
  const parsedData = JSON.parse(doctorData);
  const doctorId = parsedData.doctor.id;

  useEffect(() => {
    const fetchRxData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/rx_group/get_rx', {
          doctor_id: doctorId,
        });

        if (response.status === 200) {
          const data = response.data;
          setRxData(data); // Store as object/array, not string
          console.log('Fetched RX Data:', data);
        } else {
          setError('Error fetching RX data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching RX data.'); // Handle the error
      }
    };

    fetchRxData();
  }, [doctorId]);

  const handleGroupClick = (id, Rx_group_drugs) => {
    setSelectedGroup(id);
    setRxDataDrug(Rx_group_drugs)
    console.log(RxDataDrug)
  };

  return (
    <Box className='Rx'>
      <Box className='Header'><Header /></Box>
      <Box className='rx-main'>
        <Box className='rx-list'>
          <Box className='rx-list1'>
            <Box className='HeadBox'>
              <Box className='head'>
                <Box className='Rx-title2'>Rx Group</Box>
                <Box className='plus' onClick={() => setShowModal(true)}><GoPlusCircle /></Box>
              </Box>
              <Box className='search'>
                <Box className='searchicon'><IoSearch /></Box>
                <input className='searchtext' placeholder='Search' />
              </Box>
            </Box>
            <Box className='rx-container'>
              {RxData.map((item) => (
                <Box
                  className={`each ${selectedGroup === item.id ? 'selected' : ''}`}
                  key={item.id}
                  onClick={() => handleGroupClick(item.id, item.Rx_group_drugs)}
                >
                  <Box className={`each1 ${selectedGroup === item.id ? 'selected' : ''}`}>
                    <Box className='g-title'>
                      <Box className='groupname'>{item.rx_group_name}</Box>
                      <Box className='drugcount'> Drugs</Box>
                    </Box>
                    <Box className='g-action'>
                      <Box className='renameicon' onClick={() => setShowRenameModal(true)}><CgRename /></Box>
                      <Box className='switch' onClick={() => setShowActiveModal(true)}><ToggleSwitch /></Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className='rx-list-drug'>
          <Box className='rx-list-drug1'>
            <Box className='group-title'>Group B</Box>
            <Box className='added-drug'>Added Drugs</Box>
            <Box className='rx-drug'>
              <Box className='container-head'> </Box>
              {RxDataDrug.map((item) => ( // Assuming `data` is populated correctly
                <Box className='drug-container' key={item.id}>
                  <Box className='drug-container1'>
                    <Box className='drug-name'><li>{item.Drug_varient.drug_varient}</li></Box>
                    <Box className='drug-details'>
                      <Box className='details-text'>
                        <Box>1-1-0</Box>
                        <hr />
                        <Box>10 min - After food</Box>
                        <hr />
                        <Box>Daily for {item.Drug_varient.drugVariantsDuration.duration_count} {item.Drug_varient.drugVariantsDuration.duration_type}</Box>
                        <hr />
                        <Box>{item.Drug_varient.quantity} Qtys</Box>
                      </Box>
                      <Box className='details-action'>
                        <Box className='action-icon' sx={{ color: 'red' }}><MdDelete /></Box>
                        <Box className='action-icon' sx={{ color: '#007565' }}><MdOutlineModeEditOutline /></Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box className='container-bottom'>
                <Box className='plus-new' onClick={() => navigate('/Rxdrug')}><GoPlusCircle /></Box>
                <Box className='adddrug'>Add Drugs</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Modal Components */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Box className='popuptitle'>CREATE RX GROUP</Box>
        <Box className='createrx'>
          <Box className="rxGroupName">RX Group Name</Box>
          <Box className='createinput'>
            <input
              type="text"
              id="rxGroupName"
              placeholder="Enter Group Name"
              className="input-field"
            />
          </Box>
        </Box>
        <Box className='popup-buttom'>
          <Box onClick={() => setShowModal(false)}><SaveButton onClick={() => navigate('/Rxdrug')} /></Box>
        </Box>
      </Modal>
      <Modal show={showRenameModal} onClose={() => setShowRenameModal(false)}>
        <Box className='popuptitle'>RENAME RX GROUP</Box>
        <Box className='createrx'>
          <Box className="rxGroupName">RX Group Name</Box>
          <Box className='createinput'>
            <input
              type="text"
              id="rxGroupName"
              placeholder="Group name 1"
              className="input-field"
            />
          </Box>
        </Box>
        <Box className='popup-buttom'>
          <Box onClick={() => setShowRenameModal(false)}><SaveButton onClick={() => navigate('/Rx')} /></Box>
        </Box>
      </Modal>
      <Modal show={showActiveModal} onClose={() => setShowActiveModal(false)}>
        <Box className='popuptitle'>ACTIVATE RX GROUP</Box>
        <Box className='createrx'>
          <Box className="rxGroupName">Do you want to ACTIVATE Rx<br />Group: Group name 1</Box>
        </Box>
        <Box className='popup-buttom'>
          <Box onClick={() => setShowActiveModal(false)}>
            <button className="cancel-button" onClick={() => setShowActiveModal(false)}>Cancel</button>
            <SaveButton onClick={() => navigate('/Rx')} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Rx;
