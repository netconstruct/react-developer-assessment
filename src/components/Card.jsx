import React from 'react';
import { format } from 'date-fns';

import styles from '../styles/components/Card.module.css';

function Card({ post }) {
  const { title, summary, publishDate, author } = post;
  const formattedDate = format(new Date(publishDate), 'MMMM dd, yyyy');

  return (
    <div className={styles.card}>
      <main>
        <h1 className={styles.title}>{title}</h1>
        <p>{summary}</p>
      </main>

      <footer>
        <div>
          <p>{author.name}</p>
          <span>{formattedDate}</span>
        </div>
        <img src={author.avatar} alt="Author Avatar" />
      </footer>
    </div>
  );
}

export default Card;
