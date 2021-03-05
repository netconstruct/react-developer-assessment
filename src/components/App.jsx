import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  // TODO: Improve error handling
  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((res) => setPosts(res.posts))
      .catch((e) => alert(e));
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post, index) => {
          if (index + 1 > page * 3) return null;

          return <li key={post.id}> {post.author.name}</li>;
        })}
      </ul>

      <button type="button" onClick={() => setPage(page + 1)}>
        Load More
      </button>
    </div>
  );
}

export default App;
