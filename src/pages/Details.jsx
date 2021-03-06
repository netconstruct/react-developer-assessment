import React, { useContext } from 'react';
import { PostContext } from '../contexts/PostsContext';
import styles from '../styles/pages/Details.module.css';

function Details({ postId }) {
  const { postsToDisplay } = useContext(PostContext);

  const post = postsToDisplay.find((p) => p.id === postId);

  return (
    <main className={styles.detailsContainer}>
      <h1>{post.title}</h1>
    </main>
  );
}

export default Details;
