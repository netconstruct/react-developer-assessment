// import React from 'react'

import * as chunk from 'lodash.chunk';
import { useEffect, useState } from 'react';
import MultiSelect from './MultiSelect';
import PostList from './PostList';

// import styles from '../styles/PostDetail.module.scss'
const PostsPage = ({
  posts,
  categories,
  onChangeFilters,
  currentFilters,
  loadingStatus,
}) => {
  const chunkSize = window.innerWidth >= 550 ? 10 : 5;
  const [chunkedPosts, setChunkedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const updatedChunks = chunk(posts, chunkSize);
    setChunkedPosts(updatedChunks[currentPage]);
  }, [currentPage, posts, chunkSize]);
  return (
    <>
      <div>
        {/* TODO: Add filter functionality */}
        <label htmlFor="categorySelect">Categories</label>
        <MultiSelect
          id="categorySelect"
          options={categories}
          onChange={onChangeFilters}
          values={currentFilters}
        />
      </div>
      <section id="posts">
        {/* StatusWrapper.jsx */}
        {loadingStatus !== 'loading' ? (
          <PostList posts={chunkedPosts} />
        ) : loadingStatus === 'loading' ? (
          <div>LoadingSpinner component</div>
        ) : (
          loadingStatus === 'error' && <div>ErrorMessage component</div>
        )}
        {/* Pagination.jsx */}
        <div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        <p>
          {currentPage >= 1 ? currentPage * chunkSize : currentPage + 1}-
          {(currentPage + 1) * chunkSize} of {posts.length}
        </p>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={(currentPage + 1) * chunkSize === posts.length}
        >
          Next
        </button>
      </div>
      </section>
    </>
  );
};
export default PostsPage;
