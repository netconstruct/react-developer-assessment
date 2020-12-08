import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getCategoriesFromData } from '../helpers/formatters';
import PostDetailPage from './PostDetailPage';
import PostsPage from './PostsPage';
const getData = async () =>
  await fetch('/api/posts').then((response) => response.json());

function App() {
  // TODO: This is getting messy, convert to a much cleaner useReducer
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('loading');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (data?.length <= 0) {
        await getData()
          .then((response) => {
            // fake slow connection
            setTimeout(() => {
              setLoadingStatus('loaded');
              setData(response.posts);
            }, 1000);
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
      id:category.split(/ /g).join('_'),
    }));
    setCategories(updatedCategories);
  }, [data]);
  function handleCategoryChange(evt) {
    const { value } = evt.currentTarget;
    const currentVals = selectedCategories;
    const newVals = new Set(currentVals);
    if (newVals.has(value)) {
      newVals.delete(value);
    } else {
      newVals.add(value);
    }
    setSelectedCategories([...newVals]);
  }
  return (
    <Router>
      <header>
        <h1>Posts</h1>
      </header>
      <main>
        <Route exact path={['', '/posts']}>
          <PostsPage
            posts={data}
            categories={categories}
            loadingStatus={loadingStatus}
            onChangeFilters={handleCategoryChange}
            selectedFilters={selectedCategories}
          />
        </Route>
        <Route path="/post/:postId">
          <PostDetailPage posts={data} />
        </Route>
      </main>
      <footer>GeorgeWL</footer>
    </Router>
  );
}

export default App;
