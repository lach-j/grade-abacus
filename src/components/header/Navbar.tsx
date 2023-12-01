import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const pages = [
  { path: '/', text: 'Home' },
  { path: '/wam', text: 'WAM' },
  { path: '/gpa', text: 'GPA' },
];

const Navbar = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = `Grade Abacus | ${
      pages.find((p) => {
        return p.path === location.pathname;
      })?.text
    }`;
  }, [location]);
  return (
    <nav className="flex gap-x-2">
      {pages.map((page) => {
        return (
          <Link
            className={`${
              page.path === location.pathname ? 'bg-pink-700' : 'bg-purple-800'
            } px-2 py-1 rounded-lg hover:bg-purple-700`}
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
