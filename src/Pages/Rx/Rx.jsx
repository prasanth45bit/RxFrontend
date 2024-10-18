import Header from '../../Components/Header';
import { GoPlusCircle } from "react-icons/go";
import './Rx.css';
import React, { useState } from 'react';
import Modal from '../../Components/Model';
import { IoSearch } from "react-icons/io5";
import { Box } from '@mui/material';
import ToggleSwitch from '../../Components/Switch';
import { CgRename } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import SaveButton from '../../Components/SaveButton';
import { useNavigate } from "react-router-dom";



function Rx() {

  const navigate =useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null); 

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenRenameModal = () => setShowRenameModal(true);
  const handleCloseRenameModal = () => setShowRenameModal(false);

  const data = [
    { id: 1, group: 'Group A', drug: 5 },
    { id: 2, group: 'Group B', drug: 3 },
    { id: 3, group: 'Group C', drug: 2 },
    { id: 4, group: 'Group D', drug: 4 },
    
  ];

  const handleGroupClick = (id) => {
    setSelectedGroup(id);
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
                <Box className='plus' onClick={handleOpenModal}><GoPlusCircle /></Box>
              </Box>
              <Box className='search'>
                <Box className='searchicon'><IoSearch /></Box>
                <input className='searchtext' placeholder='Search' />
              </Box>
            </Box>
            <Box className='rx-container'>
              {data.map((item) => (
                <Box 
                  className={`each ${selectedGroup === item.id ? 'selected' : ''}`} 
                  key={item.id}
                  onClick={() => handleGroupClick(item.id)} 
                >
                  <Box className={`each1 ${selectedGroup === item.id ? 'selected' : ''}`}>
                    <Box className='g-title'>
                      <Box className='groupname'>{item.group}</Box>
                      <Box className='drugcount'>{item.drug} Drugs</Box>
                    </Box>
                    <Box className='g-action'>
                      <Box className='renameicon'  onClick={handleOpenRenameModal} ><CgRename /></Box>
                      <Box className='switch'><ToggleSwitch /></Box>
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
                  {data.map((item) => (
                    <Box className='drug-container' key={item.id}>
                      <Box className='drug-container1'>
                       <Box className='drug-name'><li>{item.group}</li></Box>
                       <Box className='drug-details'>
                        <Box className='details-text'>
                          <Box>1-1-0</Box>
                          <hr></hr>
                          <Box>10 min - After food</Box>
                          <hr></hr>
                          <Box>Daily for 67 Days</Box>
                          <hr></hr>
                          <Box>5 Qty</Box>
                        </Box>
                        <Box className='details-action'>
                          <Box className='action-icon' sx={{color:'red'}}><MdDelete /></Box>
                          <Box className='action-icon' sx={{color:'#007565'}}><MdOutlineModeEditOutline /></Box>
                        </Box>
                       </Box>
                       </Box>
                     </Box>
                  ))}
                  <Box className='container-bottom'>
                  <Box className='plus-new'><GoPlusCircle /></Box>
                  <Box className='adddrug' onClick={() => navigate('/Rxdrug')}>Add Drugs</Box>
                   </Box>
              </Box>
          </Box>
        </Box>
      </Box>
      <Modal show={showModal} onClose={handleCloseModal}>
        <Box className='popuptitle'>CREATE RX GROUP</Box>
        <Box className='createrx'>
        <Box  className="rxGroupName">RX Group Name</Box>
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
        <Box onClick={handleCloseModal}><SaveButton onClick={() => navigate('/Rx')}/></Box>
        </Box>
      </Modal>
      <Modal show={showRenameModal} onClose={handleCloseRenameModal}>
        <Box className='popuptitle'>RENAME RX GROUP</Box>
        <Box className='createrx'>
        <Box  className="rxGroupName">RX Group Name</Box>
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
        <Box onClick={handleCloseRenameModal}  ><SaveButton onClick={() => navigate('/Rx')} /></Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Rx;
