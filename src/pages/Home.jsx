import React, { useContext } from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PostContext } from '../contexts/PostsContext';
import styles from '../styles/pages/Home.module.css';

import Tag from '../components/Tag';
import Card from '../components/Card';
import Button from '../components/Button';
import {
  container,
  item,
  pageTransition,
} from '../assets/utils/animationVariants';

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

  return (
    <motion.main
      initial="initial"
      animate="open"
      exit="exit"
      variants={pageTransition}
      className={styles.homeContainer}
    >
      <h1>Categories</h1>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.categoriesContainer}
      >
        {categories.map((category) => {
          return (
            <motion.li variants={item} key={category}>
              <Tag
                isActive={activeCategories.includes(category)}
                text={category}
                onClick={() => toggleCategory(category)}
              />
            </motion.li>
          );
        })}
      </motion.ul>

      <h1>
        Posts ({postsToDisplay.length} / {totalNumberOfPosts})
      </h1>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.postsContainer}
      >
        {postsToDisplay.map((post, index) => {
          if (index + 1 > page * POSTS_PER_PAGE) return null;

          return (
            <motion.li key={post?.id} variants={item}>
              <Link to={`/details/${post?.id}`}>
                <Card post={post} />
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>

      {postsToDisplay.length > page * POSTS_PER_PAGE && (
        <Button text="Load More" onClick={incrementPage} />
      )}
    </motion.main>
  );
}

export default Home;
