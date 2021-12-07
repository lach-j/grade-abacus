import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mt-14 w-screen flex justify-center">
      <div className="mt-24 text-center flex flex-col gap-5">
        <h1 className="text-5xl font-bold">Grade Abacus</h1>
        <span className="text-gray-800">What would you like to calculate?</span>
        <div className="mt-5 flex justify-center gap-x-5 md:gap-x-9">
          <Link
            className="py-5 px-10 text-2xl rounded-full text-white hover:opacity-70 transition-opacity bg-pink-500"
            to="/wam"
          >
            WAM
          </Link>
          <Link
            className="py-5 px-10 text-2xl rounded-full text-white hover:opacity-70 transition-opacity bg-pink-500"
            to="/gpa"
          >
            GPA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
