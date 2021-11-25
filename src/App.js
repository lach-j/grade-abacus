import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import GPA from './screens/gpa';
import Home from './screens/home';
import WAM from './screens/wam';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wam" element={<WAM />} />
        <Route path="/gpa" element={<GPA />} />
      </Routes>
    </>
  );
};

export default App;
