import React from 'react';
import styles from '../styles/pages/NotFound.module.css';

import Img from '../assets/images/NotFound.png';

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Unfortunately we couldn't find the page you are looking for</h2>
      <img src={Img} alt="Entangled cables" />
    </div>
  );
}

export default NotFound;
