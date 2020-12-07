import { useEffect, useState } from 'react';
const getData = async () =>
  await fetch('/api/posts').then((response) => response.json());
function App() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    async function fetchData() {
      if (posts?.length <= 0) {
        const fetchedData = await getData().catch((err) =>
          console.error('Failed to Fetch', err)
        );
        if (fetchedData?.posts) {
          setPosts(fetchedData.posts);
        }
      }
    }
    fetchData();
  }, [posts]);
  return (
    <>
      <header></header>
      <main>
        <h1>Posts</h1>
        <ul>
          {posts.length > 0 ? (
            posts?.map((post) => (
              <li key={post.id} className={styles.row}>
                <h2>{post.title}</h2>
                <div></div>
                {JSON.stringify(Object.keys(post))}
              </li>
            ))
          ) : (
            <li>No Posts</li>
          )}
        </ul>
      </main>
      <footer>
        GeorgeWL
      </footer>
    </>
  );
}

export default App;
