import querystring from 'querystring';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MultiSelect from './MultiSelect';
import PostList from './PostList';
const PostsPage = ({
  posts,
  categories,
  onChangeFilters,
  selectedFilters,
  loadingStatus,
}) => {
  let history = useHistory();
  const location = useLocation();
  const chunkSize = window.innerWidth >= 550 ? 10 : 5;
  const [filteredPosts, setFiteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (loadingStatus === 'loaded') {
      const updatedWithCategories = posts?.map((post) => ({
        ...post,
        categories: post.categories.map((category) => ({
          ...category,
          value: category?.label?.split(/ /g).join('_'),
        })),
      }));
      setFiteredPosts(updatedWithCategories);
    }
  }, [loadingStatus, posts]);
  useEffect(() => {
    history.push({
      pathname: location.pathname,
      search:
        selectedFilters.length > 0 &&
        querystring.stringify({ selectedFilters: selectedFilters.join(',') }),
    });
  }, [selectedFilters, history, location.pathname]);
  useEffect(() => {
    const filters = querystring
      .parse(location.search, '?')
      ?.selectedFilters?.split(',')??[];
    if (filters.length>0) {
      const updatedPosts = filteredPosts?.filter((post) =>
        post.categories.some((cat) => filters?.includes(cat.value))
      );
      setFiteredPosts(updatedPosts)
    }else if(filters.length===0){
        setFiteredPosts(posts)
    }
  }, [location.search]);
  return (
    <>
      <div>
        {/* TODO: Add filter functionality */}
        <label htmlFor="categorySelect">Categories</label>
        <MultiSelect
          id="categorySelect"
          options={categories}
          onChange={onChangeFilters}
          values={selectedFilters}
        />
      </div>
      <section id="posts">
        {/* StatusWrapper.jsx */}
        {loadingStatus === 'loaded' ? (
          <PostList
            posts={filteredPosts.slice(
              currentPage,
              currentPage + 1 * chunkSize
            )}
          />
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
