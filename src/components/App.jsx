import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((res) => setPosts(res.posts));
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li>{post.author.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
