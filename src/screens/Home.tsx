import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="mt-12 text-center flex flex-col gap-5">
      <h1 className="text-5xl font-bold">Grade Abacus</h1>
      <span className="text-gray-800">What would you like to calculate?</span>
      <div className="mt-5 flex justify-center gap-x-5 md:gap-x-9">
        <Link to="/wam">
          <Button size="xl">WAM</Button>
        </Link>
        <Link to="/gpa">
          <Button size="xl">GPA</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
