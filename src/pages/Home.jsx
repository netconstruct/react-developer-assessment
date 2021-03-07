import React, { useContext } from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PostContext } from '../contexts/PostsContext';
import styles from '../styles/pages/Home.module.css';

import Tag from '../components/Tag';
import Card from '../components/Card';
import Button from '../components/Button';

function Home() {
  const {
    totalNumberOfPosts,
    postsToDisplay,
    page,
    categories,
    activeCategories,
    incrementPage,
    toggleCategory,
    POSTS_PER_PAGE,
  } = useContext(PostContext);

  const animationVariants = {
    initial: { opacity: 0, x: -100 },
    open: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <motion.main
      initial="initial"
      animate="open"
      exit="exit"
      variants={animationVariants}
      className={styles.homeContainer}
    >
      <h1>Categories</h1>
      <ul className={styles.categoriesContainer}>
        {categories.map((category) => {
          return (
            <li key={category}>
              <Tag
                isActive={activeCategories.includes(category)}
                text={category}
                onClick={() => toggleCategory(category)}
              />
            </li>
          );
        })}
      </ul>

      <h1>
        Posts ({postsToDisplay.length} / {totalNumberOfPosts})
      </h1>
      <ul className={styles.postsContainer}>
        {postsToDisplay.map((post, index) => {
          if (index + 1 > page * POSTS_PER_PAGE) return null;

          return (
            <Link key={post.id} to={`/details/${post.id}`}>
              <Card post={post} />
            </Link>
          );
        })}
      </ul>

      {postsToDisplay.length > page * POSTS_PER_PAGE && (
        <Button text="Load More" onClick={incrementPage} />
      )}
    </motion.main>
  );
}

export default Home;
