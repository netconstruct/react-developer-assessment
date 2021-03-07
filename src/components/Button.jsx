import React from 'react';
import styles from '../styles/components/Button.module.css';

function Button({ onClick, text }) {
  return (
    <button onClick={onClick} type="button" className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
