import React from 'react';

import styles from '../styles/components/Tag.module.css';

function Tag({ text, isActive, isSmall, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.tag} ${isActive && styles.active} ${
        isSmall && styles.small
      }`}
    >
      <span>{text}</span>
      <span>{text}</span>
    </button>
  );
}

export default Tag;
