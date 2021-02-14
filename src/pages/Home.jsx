import { useState, useEffect } from 'react';
import generateAvailableFilters from '../utils/generateAvailableFilters';
import generateFilteredPosts from '../utils/generateFilteredPosts';
import Filters from '../components/Filters';
import { ListItem } from '../styledComponents/ListItem';

function Home({ apiData }) {
  const [filterValue, updateFilterValue] = useState('All');
  const [listItems, setListItems] = useState();
  const [paginationValue, setPaginationValue] = useState(10);

  // Here we need to filter the apiData to only return the articles that have a matching category name.
  // This will run every time we update the filter values stored in state or we update the pagination value
  useEffect(() => {
    setListItems(generateFilteredPosts(filterValue, apiData.posts));
  }, [filterValue, apiData, paginationValue]);

  const handleShowPosts = (show) => {
    show === 'remove'
      ? setPaginationValue(paginationValue - 5)
      : setPaginationValue(paginationValue + 5);
  };

  return (
    <>
      <Filters
        filters={generateAvailableFilters(apiData.posts)}
        updateFilterValue={updateFilterValue}
      />
      <ul>
        {/* Here we slice the listItems array using the pagination value to 
        only return the specified number of filtered posts */}
        {listItems.slice(0, paginationValue)?.map((item) => (
          <ListItem key={item.id}>{item.title}</ListItem>
        ))}
      </ul>

      {/* Show more and less buttons render based on number of posts in the 
      filtered items array vs selected pagination value*/}
      {listItems.length > paginationValue && (
        <button onClick={handleShowPosts}>Show More....</button>
      )}
      {paginationValue > 10 && (
        <button onClick={() => handleShowPosts('remove')}>Show Less....</button>
      )}
    </>
  );
}

export default Home;
