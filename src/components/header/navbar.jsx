import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const pages = [
    { path: '/', text: 'Home' },
    { path: '/wam', text: 'WAM' },
    { path: '/gpa', text: 'GPA' },
  ];
  const location = useLocation();
  return (
    <nav className="flex gap-x-2">
      {pages.map((page) => {
        return (
          <Link
            className={`${
              page.path === location.pathname ? 'bg-pink-700' : 'bg-purple-700'
            } px-2 py-1 bg-purple-700 rounded-lg hover:bg-purple-600`}
            to={page.path}
          >
            {page.text}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
