import { useState, useEffect } from 'react';
import generateAvailableFilters from '../utils/generateAvailableFilters';
import generateFilteredPosts from '../utils/generateFilteredPosts';
import Filters from '../Filters';

function Home({ apiData }) {
  const [filterValue, updateFilterValue] = useState('Surveys and Forms');
  const [listItems, setListItems] = useState();

  // Here we need to filter the apiData to only return the articles that have a matching category name.
  // This will run every time we update the filter values stored in state
  useEffect(() => {
    setListItems(generateFilteredPosts(filterValue, apiData.posts));
  }, [filterValue, apiData]);

  return (
    <div>
      Home Page
      <Filters filters={generateAvailableFilters(apiData.posts)} />
      {listItems?.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
}

export default Home;
