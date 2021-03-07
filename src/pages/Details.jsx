import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/pages/Details.module.css';
import { PostContext } from '../contexts/PostsContext';
import { format } from 'date-fns';

import Tag from '../components/Tag';

import ArrowLeft from '../assets/images/arrow_left.svg';
import ArrowRight from '../assets/images/arrow_right.svg';

function Details({ postId }) {
  const { postsToDisplay } = useContext(PostContext);
  const post = postsToDisplay.find((p) => p.id === postId);
  const postIndex = postsToDisplay.findIndex((p) => p.id === postId);
  const nextPostId =
    postIndex < postsToDisplay.length + 1
      ? postsToDisplay[postIndex + 1].id
      : postsToDisplay[0].id;

  const formattedDate = format(new Date(post.publishDate), 'MMMM dd, yyyy');

  return (
    <div className={styles.detailsContainer}>
      <main className={styles.detailsContent}>
        <h1>{post.title}</h1>
        <span>{formattedDate}</span>
        <p>{post.summary}</p>
        <ul>
          {post.categories.map((category) => (
            <Tag
              key={category.id}
              isActive={true}
              text={category.name}
              isSmall
            />
          ))}
        </ul>

        <div className={styles.separator} />

        <img src={post.author.avatar} alt="Author Avatar" />
        <span className={styles.authorName}>{post.author.name}</span>
      </main>

      <footer>
        <Link to="/">
          Go Back
          <img src={ArrowLeft} alt="" />
        </Link>
        <Link to={`/details/${nextPostId}`}>
          Next Article
          <img src={ArrowRight} alt="" />
        </Link>
      </footer>
    </div>
  );
}

export default Details;
