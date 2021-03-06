import React, { createContext, useEffect, useState } from 'react';

export const PostContext = createContext({});

export function ContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const POSTS_PER_PAGE = 8;

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

  function toggleCategory(category) {
    if (!activeCategories.includes(category))
      return setActiveCategories([...activeCategories, category]);

    const categoryIndex = activeCategories.indexOf(category);
    const newActiveCategories = [...activeCategories];
    newActiveCategories.splice(categoryIndex, 1);

    return setActiveCategories(newActiveCategories);
  }

  function incrementPage() {
    setPage(page + 1);
  }

  // TODO: Improve error handling
  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((res) => setPosts(res.posts))
      .catch((e) => alert(e));
  }, []);

  useEffect(() => {
    setCategories(getAllCategories(posts));
  }, [posts]);

  // Filter posts according to the active categories
  useEffect(() => {
    // If no category is active, display all posts
    if (activeCategories.length === 0) return setPostsToDisplay(posts);

    setPostsToDisplay(
      posts.filter(({ categories }) =>
        categories.some((category) => activeCategories.includes(category.name))
      )
    );
  }, [posts, activeCategories]);

  return (
    <PostContext.Provider
      value={{
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
