import * as chunk from 'lodash.chunk';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { formatDateString, getCategoriesFromData } from '../helpers/formatters';
import MultiSelect from './MultiSelect';
import PostList from './PostList';
const getData = async () =>
  await fetch('/api/posts').then((response) => response.json());

function App() {
  // TODO: This is getting messy, convert to a much cleaner useReducer
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('loading');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const chunkSize = window.innerWidth >= 550 ? 10 : 5;
  useEffect(() => {
    async function fetchData() {
      if (data?.length <= 0) {
        await getData()
          .then((response) => {
            // fake slow connection
            setTimeout(()=>{

              setLoadingStatus('loaded');
              setData(response.posts);
            },1000)
          })
          .catch((err) => {
            setLoadingStatus('error');
            console.error('Failed to Fetch', err);
          });
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
      <header>
        <h1>Posts</h1>
      </header>
      <main>
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
          {loadingStatus !== 'loading' ? (
            <PostList posts={posts} />
          ) : loadingStatus === 'loading' ? (
            <div>LoadingSpinner component</div>
          ) : (
            loadingStatus === 'error' && <div>ErrorMessage component</div>
          )}
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
