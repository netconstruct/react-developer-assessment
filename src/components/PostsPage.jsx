// import React from 'react'

import MultiSelect from './MultiSelect';
import PostList from './PostList';

// import styles from '../styles/PostDetail.module.scss'
const PostsPage = ({
  posts,
  categories,
  onChangeFilters,
  currentFilters,
  loadingStatus,
}) => (
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
        <PostList posts={posts} />
      ) : loadingStatus === 'loading' ? (
        <div>LoadingSpinner component</div>
      ) : (
        loadingStatus === 'error' && <div>ErrorMessage component</div>
      )}
      {/* Pagination.jsx */}
      {/* <div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        <p>
          {currentPage >= 1 ? currentPage * chunkSize : currentPage + 1}-
          {(currentPage + 1) * chunkSize} of {data.length}
        </p>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={(currentPage + 1) * chunkSize === data.length}
        >
          Next
        </button>
      </div> */}
    </section>
  </>
);
export default PostsPage;
