import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Rx from './Pages/Rx/Rx';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Rx />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
