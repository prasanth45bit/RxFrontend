import Header from '../../Components/Header'
import { GoPlusCircle } from "react-icons/go";
import './Rx.css';
import React, { useState } from 'react';
import Modal from '../../Components/Model';
import { IoSearch } from "react-icons/io5";

function Rx() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    
const data = [
    { id: 1, group: 'Group A', drug: 5 },
    { id: 2, group: 'Group B', drug: 3 },
    { id: 3, group: 'Group C', drug: 2 },
    { id: 4, group: 'Group D', drug: 4 },
  ];


  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  



  return (
    <div className='Rx'>
        <div className='Header'><Header /></div>
        <div className='rx-main'>
            <div className='rx-list'>
                <div className='rx-list1'>
                <div className='head'>
                <div className='Rx-title2'>Rx Group</div>
                <div className='plus' onClick={handleOpenModal} ><GoPlusCircle /></div>
                </div>
                <div className='search'>
                    <div className='searchicon'> <IoSearch /> </div>
                    <input className='searchtext' placeholder='Search'/>
                </div>
                <div className='rx-container'>
                {data.map((item) => (
                    <div className='each' key={item.id}>
                    <div className='each1'>
                    {item.group}
                    <br/>
                    <p>{item.drug} Drugs</p>
                    </div>
                    <hr></hr>
                    </div>   
                ))}
                </div>
                </div>
            </div>
            <div className='rx-list-drug'></div>
            
        </div>
        <Modal show={showModal} onClose={handleCloseModal}>
        <h2>CREATE RX GROUP</h2>
        <label htmlFor="rxGroupName">RX Group Name</label>
        <input
          type="text"
          id="rxGroupName"
          placeholder="Group name 1"
          className="input-field"
        />
        <button className="save-button" onClick={handleCloseModal}>
          SAVE
        </button>
      </Modal>
    </div>
  )
}

export default Rx