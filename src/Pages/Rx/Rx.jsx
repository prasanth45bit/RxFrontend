import Header from '../../Components/Header';
import { GoPlusCircle } from "react-icons/go";
import './Rx.css';
import React, { useState, useEffect } from 'react';
import Modal from '../../Components/Model';
import { IoSearch } from "react-icons/io5";
import { Box } from '@mui/material';
import ToggleSwitch from '../../Components/Switch';
import { CgBorderTop, CgRename } from "react-icons/cg";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import SaveButton from '../../Components/SaveButton';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDataContext } from '../../Components/Datacontaxt';

function Rx() {
  const navigate = useNavigate();
  const [renameid , setrenameid] = useState('')
  const [GroupName, setGroupName]=useState('')
  const [changegroupname, setChangeGroupName]=useState('')
  const [newGroup, setnewGroup]=useState('')
  const [RxData, setRxData] = useState([]);
  const [RxDataDrug, setRxDataDrug] = useState([]);
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const doctorData = localStorage.getItem('doctorData');
  const parsedData = JSON.parse(doctorData);
  const doctorId = parsedData.doctor.id;
  const { setSelectedRx } = useDataContext();

  useEffect(() => {
    const fetchRxData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/rx_group/get_rx', {  
          doctor_id: doctorId,
        });
  
        if (response.status === 200) {
          const data = response.data;
          setRxData(data); 
          console.log('Fetched RX Data:', data);
  
          if (data && data.length > 0) {
            setSelectedGroup(data[0].id);
            setRxDataDrug(data[0].Rx_group_drugs);
            setGroupName(data[0].rx_group_name);
            setSelectedRx([{ id: data[0].id, name: data[0].rx_group_name }]);
          }
          
        } else {
          setError('Error fetching RX data');
        }
      } catch (error) {
        console.log('error')
      }
    };
  
    fetchRxData();
  }, [doctorId,changegroupname]);
  
  const handleGroupClick = (id, Rx_group_drugs, groupname) => {
    setSelectedGroup(id);
    setRxDataDrug(Rx_group_drugs)
    setGroupName(groupname)
    console.log(RxDataDrug)
  };

  const handleActive =  (active) => {
  
      if(active === true)
      {
        setShowActiveModal(true)
      }
  }

  const handleChangeGroupName = async ( changegroupname) => {
  
    try {
      const response = await axios.post('http://localhost:5000/rx_group/rename_rx', {
        rx_group_id: renameid,
        new_name: changegroupname
      });

      if (response.status === 200) {
        setShowRenameModal(false);
      } else {
        setError('Error fetching RX data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching RX data.');
    }
  };

  const handleRename = (id) =>
  {
      setShowRenameModal(true);
      setrenameid(id);
  }

  const handleCreateRxGroup = async (n) =>

    {
      try {
        const response = await axios.post('http://localhost:5000/rx_group/post_rx', {
          rx_group_name: n,
          doctor_id: doctorId
        });
  
        if (response.status === 200) {
          setShowModal(false);
          setSelectedRx(selectedGroup)
        } else {
          setError('Error fetching RX data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching RX data.');
      }
    };
    

    const handleAddDrug = () =>
    {
      navigate('/Rxdrug');
      setSelectedRx([{ id:selectedGroup, name: GroupName }]);
    }


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
                  onClick={() => handleGroupClick(item.id, item.Rx_group_drugs, item.rx_group_name)}
                >
                  <Box className={`each1 ${selectedGroup === item.id ? 'selected' : ''}`}>
                    <Box className='g-title'>
                      <Box className='groupname'>{item.rx_group_name}</Box>
                      <Box className='drugcount'>{item.Rx_group_drugs.length} Drugs</Box>
                    </Box>
                    <Box className='g-action'>
                      <Box className='renameicon' onClick={() => handleRename(item.id)}><CgRename /></Box>
                      <Box className='switch' onClick={() => handleActive(item.isactive)}><ToggleSwitch status={item.isactive} id={item.id}/></Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className='rx-list-drug'>

         {selectedGroup>0 ? (<Box className='rx-list-drug1'>
            <Box className='group-title'>{GroupName}</Box>
            <Box className='added-drug'>Added Drugs</Box>
            <Box className='rx-drug'>
              <Box className='container-head'> </Box>
              {RxDataDrug.map((item) => ( // Assuming `data` is populated correctly
                <Box className='drug-container' key={item.id}>
                  <Box className='drug-container1'>
                    <Box className='drug-name'><li>{item.Drug_varient.drug.drug_name} {item.Drug_varient.drug_varient}</li></Box>
                    <Box className='drug-details'>
                      <Box className='details-text'>
                        <Box>{item.dose_m}-{item.dose_an}-{item.dose_n}</Box>
                        <hr />
                        <Box>{item.drugTime.time} - {item.drugWhen.when}</Box>
                        <hr />
                        <Box>Daily for {item.drugDuration.duration_count}  {item.drugDuration.duration_type}</Box>
                        <hr />
                        <Box>{item.quantity} Qtys</Box>
                      </Box>
                      <Box className='details-action'>
                        <Box className='action-icon' sx={{ color: 'red' }}><MdDelete /></Box>
                        <Box className='action-icon' sx={{ color: '#007565' }}><MdOutlineModeEditOutline /></Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box className={`container-bottom ${RxDataDrug.length > 0 ? 'selected' : ''}`}>
                <Box className='plus-new' onClick={() => handleAddDrug()}><GoPlusCircle /></Box>
                <Box className='adddrug'>Add Drugs</Box>
              </Box>
            </Box>
          </Box>):( <div></div> )}
        </Box>
      </Box>
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
              value={newGroup}
              onChange={(e)=> setnewGroup(e.target.value)}
            />
          </Box>
        </Box>
        <Box className='popup-buttom'>
          <Box onClick={(e) => handleCreateRxGroup(newGroup)}><SaveButton onClick={() => navigate('/Rxdrug')} /></Box>
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
              value={changegroupname}
              placeholder="Group name 1"
              className="input-field"
              onChange={(e)=> setChangeGroupName(e.target.value)}
            />
          </Box>
        </Box>
        <Box className='popup-buttom'>
          <Box onClick={() => handleChangeGroupName(changegroupname)}><SaveButton onClick={() => navigate('/Rx')} /></Box>
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