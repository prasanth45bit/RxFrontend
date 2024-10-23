import Header from '../../Components/Header/Header';
import { GoPlusCircle } from "react-icons/go";
import './Rx.css';
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { Box } from '@mui/material';
import ToggleSwitch from '../../Components/Switch/Switch';
import { CgRename } from "react-icons/cg";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDataContext } from '../../Components/Datacontaxt';
import DeleteModal from '../../Components/Delete/Delete';
import CreateRxGroupModal  from '../../Components/Create/Create';
import RenameRxGroupModal from '../../Components/Rename/Rename';

function Rx() {
  const navigate = useNavigate();
  const [renameid , setrenameid] = useState('')
  const [GroupName, setGroupName]=useState('')
  const [changegroupname, setChangeGroupName]=useState('')
  const [RxData, setRxData] = useState([]);
  const [RxDataDrug, setRxDataDrug] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const doctorData = localStorage.getItem('doctorData');
  const parsedData = JSON.parse(doctorData);
  const doctorId = parsedData.doctor.id;
  const { setSelectedRx } = useDataContext();
  const [selectedDrugInfo, setSelectedDrugInfo] = useState([]);

  const handleDeleteClick = (drugId, drugname, drugvarient) => {
    setSelectedDrugInfo([drugId, drugname, drugvarient]); 
    setShowDeleteModal(true);
  };
  


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



  

  const handleRename = (id) =>
  {
      setShowRenameModal(true);
      setrenameid(id);
  }

 

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
                      <Box className='switch' ><ToggleSwitch status={item.isactive} id={item.id} groupname={GroupName}/></Box>
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
              {RxDataDrug.map((item) => ( 
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
                      <Box className='action-icon' sx={{ color: 'red' }} onClick={() => handleDeleteClick(item.drug_varient_id, item.Drug_varient.drug.drug_name, item.Drug_varient.drug_varient )}><MdDelete /></Box>
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
      
      <CreateRxGroupModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        doctorId={doctorId}
        setShowModal={setShowModal}
      />
      
      <RenameRxGroupModal 
        show={showRenameModal} 
        onClose={() => setShowRenameModal(false)} 
        renameId={renameid}
      />
      <DeleteModal
  rx_group_id={selectedGroup}
  drug_info={selectedDrugInfo}
  show={showDeleteModal}
  setShowDeleteModal={setShowDeleteModal}
  onClose={() => setShowDeleteModal(false)}
/>

    </Box>
  );
}

export default Rx;
