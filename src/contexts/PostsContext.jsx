import React, { createContext, useEffect, useState } from 'react';
import { useQueryState } from 'react-router-use-location-state';

export const PostContext = createContext({});

export function ContextProvider({ children }) {
  // As the amount of states grow, these states would ideally be refactored into a reducer
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [appStatus, setAppStatus] = useState('LOADING');

  const POSTS_PER_PAGE = 8;

  const [, setQueryStringActiveCategories] = useQueryState('categories', []);

  function getAllCategories(postList) {
    const categoriesNamesArr = [];
    postList.map((post) =>
      post.categories.map(({ name }) => {
        if (categoriesNamesArr.indexOf(name) === -1)
          categoriesNamesArr.push(name);
        return null;
      })
    );

    return categoriesNamesArr.sort();
  }

  // Used to turn on/off the filter for selected category
  function toggleCategory(category) {
    // If the selected category is not listed in activeCategories, add it
    if (!activeCategories.includes(category)) {
      // Also adds it to URL query string
      setQueryStringActiveCategories([...activeCategories, category]);
      return setActiveCategories([...activeCategories, category]);
    }

    // Otherwise, remove said category from the array
    const categoryIndex = activeCategories.indexOf(category);
    const newActiveCategories = [...activeCategories];
    newActiveCategories.splice(categoryIndex, 1);

    // Also removes it from URL query string
    setQueryStringActiveCategories(newActiveCategories);

    return setActiveCategories(newActiveCategories);
  }

  // Increments the amount of posts currently displayed
  function incrementPage() {
    setPage(page + 1);
  }

  // TODO: Improve error handling
  // Initial data fetching
  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((res) => setPosts(res.posts))
      .then(() => setAppStatus('DONE'))
      .catch((e) => {
        setAppStatus('ERROR');
        alert(e);
      });
  }, []);

  // Maps through all data and get every available category
  useEffect(() => {
    setCategories(getAllCategories(posts));
  }, [posts]);

  // Filter posts according to the active categories
  useEffect(() => {
    // If no category is active, display all posts
    if (activeCategories.length === 0) return setPostsToDisplay(posts);

    // Will show a post if it has at least one of the selected categories
    // setPostsToDisplay(
    //   posts.filter(({ categories }) =>
    //     categories.some((category) => activeCategories.includes(category.name))
    //   )
    // );

    // Will show a post only if it has all of the selected categories
    setPostsToDisplay(
      posts.filter(({ categories }) =>
        activeCategories.every((activeCategory) => {
          let bool = categories.reduce(
            (total, category) => category.name === activeCategory || total,
            false
          );
          return bool;
        })
      )
    );
  }, [posts, activeCategories]);

  return (
    <PostContext.Provider
      value={{
        appStatus,
        totalNumberOfPosts: posts.length,
        postsToDisplay,
        page,
        incrementPage,
        categories,
        activeCategories,
        toggleCategory,
        POSTS_PER_PAGE,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
