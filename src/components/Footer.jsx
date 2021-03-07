import React from 'react';

import styles from '../styles/components/Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <span>March &middot; 2021</span>
        <span>
          by{' '}
          <a href="https://pedroklepa.com" rel="noreferrer" target="_blank">
            Pedro Klepa
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
