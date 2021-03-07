import { createContext, ReactNode, useEffect, useState } from 'react';
import { useQueryState } from 'react-router-use-location-state';

interface PostsContextDataI {
  appStatus: string;
  totalNumberOfPosts: number;
  postsToDisplay: any;
  page: number;
  incrementPage: () => void;
  categories: any;
  activeCategories: any;
  toggleCategory: (arg0: string) => any;
  POSTS_PER_PAGE: number;
}

interface ContextProviderI {
  children: ReactNode;
}

export interface PostI {
  id: string;
  title: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
  summary: string;
  categories: Array<CategoryI>;
}

interface CategoryI {
  id: string;
  name: string;
}

export const PostContext = createContext({} as PostsContextDataI);

export function ContextProvider({ children }: ContextProviderI) {
  // As the amount of states grow, these states would ideally be refactored into a reducer
  const [posts, setPosts] = useState<PostI[]>([]);
  const [postsToDisplay, setPostsToDisplay] = useState<PostI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [appStatus, setAppStatus] = useState<string>('LOADING');

  const POSTS_PER_PAGE = 8;

  const [, setQueryStringActiveCategories] = useQueryState<string[]>(
    'categories',
    []
  );

  // Used to turn on/off the filter for selected category
  function toggleCategory(category: string) {
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
    const categoriesNamesArr: string[] = [];
    posts.map((post) =>
      post.categories.map(({ name }) => {
        if (categoriesNamesArr.indexOf(name) === -1)
          categoriesNamesArr.push(name);
        return null;
      })
    );

    setCategories(categoriesNamesArr.sort());
  }, [posts]);

  // Filter posts according to the active categories
  useEffect(() => {
    // If no category is active, display all posts
    if (activeCategories.length === 0) return setPostsToDisplay(posts);

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
