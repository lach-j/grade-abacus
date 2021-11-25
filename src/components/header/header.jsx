import React from 'react';
import Navbar from './navbar';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-purple-500 text-white h-14 flex items-center px-5 justify-between">
      <h1>Grade Calculators</h1>
      <Navbar />
    </div>
  );
};

export default Header;
