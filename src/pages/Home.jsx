import { useState, useEffect } from 'react';
import generateAvailableFilters from '../utils/generateAvailableFilters';
import generateFilteredPosts from '../utils/generateFilteredPosts';
import Filters from '../components/Filters';

function Home({ apiData }) {
  const [filterValue, updateFilterValue] = useState('All');
  const [listItems, setListItems] = useState();

  // Here we need to filter the apiData to only return the articles that have a matching category name.
  // This will run every time we update the filter values stored in state
  useEffect(() => {
    setListItems(generateFilteredPosts(filterValue, apiData.posts));
  }, [filterValue, apiData]);

  return (
    <div>
      <Filters
        filters={generateAvailableFilters(apiData.posts)}
        updateFilterValue={updateFilterValue}
      />
      <ul>
        {listItems?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
