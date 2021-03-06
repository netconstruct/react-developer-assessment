import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  // const [postsToDisplay, setPostsToDisplay] = useState([]);
  // const [activeCategory, setActiveCategory] = useState([]);

  const POSTS_PER_PAGE = 6;

  // function filterByCategory(postList, category) {
  //   if (category === 'ALL') return postList;

  //   return postList.filter((post) =>
  //     post.categories.some((cat) => cat.name === category)
  //   );
  // }

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

  return (
    <div>
      <h1>POSTS</h1>
      <ul>
        {posts.map((post, index) => {
          if (index + 1 > page * POSTS_PER_PAGE) return null;

          return <li key={post.id}> {post.author.name}</li>;
        })}
      </ul>

      <button type="button" onClick={() => setPage(page + 1)}>
        Load More
      </button>

      <h1>CATEGORIES</h1>
      <ul>
        {categories.map((category) => {
          return <li key={category}> {category}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
