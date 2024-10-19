import React, { useState } from 'react';
import './Popup.css';

const PopupActive = () => {


  return (
    <div>
      <button >Open Popup</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Are you sure?</h2>
            <p>Do you want to IN-ACTIVATE Rx<br />Group: Group name 1</p>
            <div className="popup-buttons">
              <button className="cancel-button" onClick={closePopup}>Cancel</button>
              <button className="inactive-button">Inactive</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupActive;
