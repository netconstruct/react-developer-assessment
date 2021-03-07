import React from 'react';

import styles from '../styles/components/Tag.module.scss';

interface TagI {
  text: string;
  isActive: boolean;
  isSmall?: boolean;
  onClick?: (arg0: any) => void;
}

function Tag({ text, isActive, isSmall, onClick }: TagI) {
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
