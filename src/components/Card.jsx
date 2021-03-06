import React from 'react';

import styles from '../styles/components/Card.module.css';

function Card({ post }) {
  const { title, summary, publishDate, author } = post;

  return (
    <li className={styles.card}>
      <main>
        <h1 className={styles.title}>{title}</h1>
        <p>{summary}</p>
      </main>

      <footer>
        <div>
          <p>{author.name}</p>
          <span>{publishDate}</span>
        </div>
        <img src={author.avatar} alt="Author Avatar" />
      </footer>
    </li>
  );
}

export default Card;
