import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Rx from './Pages/Rx/Rx';
import Box from '@mui/material/Box';
import RxDrug from './Pages/Rx/RxDrug';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Rx" element={<Rx />} />
        <Route path="/Rxdrug" element={<RxDrug />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
