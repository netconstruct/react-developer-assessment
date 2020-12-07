import { useEffect, useState } from 'react';
import { formatDateString } from '../helpers/formatters';
const getData = async () =>
  await fetch('/api/posts').then((response) => response.json());

function App() {
  const [posts, setPosts] = useState([]);
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
            posts?.map((post) => {
              const parsedDate = formatDateString(post.publishDate)
              return(
              <li key={post.id}>
                <h2>{post.title}</h2>
                <div>
                  <p>
                    {post.summary
                      .slice(
                        0,
                        post.summary.length > 130 ? 130 : post.summary.length
                      )
                      .trim()}
                    {post.summary.length > 130 && '...'}
                  </p>
                </div>
                <div>
                  <img
                    src={post.author.avatar}
                    aria-hidden="true"
                    alt="author avatar"
                  />
                  <strong>{post.author.name}</strong>
                </div>
                <div>
                  <p>
                    {parsedDate}
                  </p>
                </div>
                <ul>
                  {post.categories?.map(category=>(
                    <li key={category.id}>
                      <a href={`posts?categoryId=${category.id}`} >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )})
          ) : (
            <li>No Posts</li>
          )}
        </ul>
      </main>
      <footer>GeorgeWL</footer>
    </>
  );
}

export default App;
