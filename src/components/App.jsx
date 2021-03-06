import { useEffect, useState } from 'react';

import styles from '../styles/components/App.module.css';

import Navbar from './Navbar';
import Card from './Card';
import Footer from './Footer';

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const POSTS_PER_PAGE = 3;

  function filterByCategory(postList, categoriesArr) {
    if (categoriesArr.length === 0) return postList;

    return postList.filter(({ categories }) =>
      categories.some((category) => categoriesArr.includes(category.name))
    );
  }

  function getAllCategories(postList) {
    const categoriesNamesArr = [];
    postList.map((post) =>
      post.categories.map(({ name }) => {
        if (categoriesNamesArr.indexOf(name) === -1)
          categoriesNamesArr.push(name);
        return null;
      })
    );

    return categoriesNamesArr;
  }

  function toggleCategory(category) {
    if (!activeCategories.includes(category))
      return setActiveCategories([...activeCategories, category]);

    const categoryIndex = activeCategories.indexOf(category);
    const newActiveCategories = [...activeCategories];
    newActiveCategories.splice(categoryIndex, 1);

    return setActiveCategories(newActiveCategories);
  }

  // TODO: Improve error handling
  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((res) => setPosts(res.posts))
      .catch((e) => alert(e));
  }, []);

  useEffect(() => {
    setPostsToDisplay(filterByCategory(posts, activeCategories));
    setCategories(getAllCategories(posts));
  }, [posts, activeCategories]);

  return (
    <div className={styles.appContainer}>
      <Navbar />

      <main>
        <h1>POSTS</h1>
        <ul className={styles.postsContainer}>
          {postsToDisplay.map((post, index) => {
            if (index + 1 > page * POSTS_PER_PAGE) return null;

            return <Card key={post.id} post={post} />;
          })}
        </ul>

        <button type="button" onClick={() => setPage(page + 1)}>
          Load More
        </button>

        <h1>CATEGORIES</h1>
        <ul className={styles.categoriesContainer}>
          {categories.map((category) => {
            return (
              <li key={category}>
                <button onClick={() => toggleCategory(category)}>
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </main>

      <Footer />
    </div>
  );
}

export default App;
