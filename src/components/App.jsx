import * as chunk from 'lodash.chunk';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { formatDateString, getCategoriesFromData } from '../helpers/formatters';
import MultiSelect from './MultiSelect';
const getData = async () =>
  await fetch('/api/posts').then((response) => response.json());

function App() {
  // TODO: This is getting messy, convert to a much cleaner useReducer
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const chunkSize = window.innerWidth >= 550 ? 10 : 5;
  useEffect(() => {
    async function fetchData() {
      if (data?.length <= 0) {
        const response = await getData().catch((err) =>
          console.error('Failed to Fetch', err)
        );
        setData(response.posts);
      }
    }
    fetchData();
    const updatedCategories = getCategoriesFromData(data).map((category) => ({
      label: category,
      id: nanoid(),
    }));
    setCategories(updatedCategories);
  }, [data]);
  useEffect(() => {
    const chunkedPosts = chunk(data, chunkSize);
    setPosts(chunkedPosts[currentPage]);
  }, [currentPage, data, chunkSize]);
  // TODO: Split this into sub-components
  return (
    <>
      <header></header>
      <main>
        <h1>Posts</h1>
        <div>
          {/* TODO: Add functionality */}
          <label htmlFor="categorySelect">Categories</label>
          <MultiSelect
            id="categorySelect"
            options={categories}
            onChange={(evt) => {
              const { value } = evt.currentTarget;
              const currentVals = selectedCategories;
              const newVals = new Set(currentVals);
              if (newVals.has(value)) {
                newVals.delete(value);
              } else {
                newVals.add(value);
              }
              setSelectedCategories([...newVals]);
            }}
            values={selectedCategories}
          />
        </div>
        <section id="posts">
          <ul>
            {/* PostList.js */}
            {posts?.length > 0 ? (
              posts?.map((post) => {
                const parsedDate = formatDateString(post.publishDate);
                return (
                  // Post.js
                  <li key={post.id}>
                    <h2>{post.title}</h2>
                    <div>
                      <p>
                        {post.summary
                          .slice(
                            0,
                            post.summary.length > 130
                              ? 130
                              : post.summary.length
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
                      <p>{parsedDate}</p>
                    </div>
                    <ul>
                      {post.categories?.map((category) => (
                        <li key={category.id}>
                          <a href={`posts?categoryId=${category.id}`}>
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })
            ) : (
              <li>No Posts</li>
            )}
          </ul>
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
              {(currentPage + 1) * chunkSize} of {data.length}
            </p>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={(currentPage + 1) * chunkSize === data.length}
            >
              Next
            </button>
          </div>
        </section>
      </main>
      <footer>GeorgeWL</footer>
    </>
  );
}

export default App;
