import React from 'react';
import Navbar from './Navbar';
import { header } from '../../theme';
const Header = () => {
  const styles = header;
  return (
    <div className={styles.container}>
      <h1>Grade Abacus</h1>
      <Navbar />
    </div>
  );
};

export default Header;
