import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import GPA from './screens/gpa';
import Home from './screens/home';
import WAM from './screens/wam';

const App = () => {
  return (
    <>
      <h1>Grade Calculator</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/wam">WAM</Link>
        </li>
        <li>
          <Link to="/gpa">GPA</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wam" element={<WAM />} />
        <Route path="/gpa" element={<GPA />} />
      </Routes>
    </>
  );
};

export default App;
