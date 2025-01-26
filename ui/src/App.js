import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
