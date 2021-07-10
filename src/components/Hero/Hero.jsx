import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import DataTable from '../DataTable/DataTable';


function Hero() {
// State variables for API data, Search Query (Text based), Filter Query (checkbox), Pagination and all categories from API data
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState([]);
  const [results, setResults] = useState(10);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('api/posts')
      .then((res) => res.json())
      .then((data) => {
        const { posts } = data;
        setPosts(posts);
        setCategories(getUniqueCategories(posts));
      });
  }, []);

  // Function to search based on text type
  const search = (data) => {
      return data.filter((post) => {
        for (let i = 0; i < post.categories.length; i++) {
          if (post.categories[i].name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) return true
        }
        return false
      })
    }

    //Function to get Categories and de-duplicate any repeating values
    const getUniqueCategories = (data) => {
      let categoriesArray = []
      
      for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].categories.length; j++) {
          categoriesArray.push(data[i].categories[j].name)
        }
      }
    
      let uniqueCategoriesArray = categoriesArray.filter((item, index, self) => {
        return (
          self.indexOf(item) === index
        )
      })

      return uniqueCategoriesArray;
    }

    // Function to filter based on categories
    const filter = (data) => {

      if (filterQuery.length < 1) {
        return data
      } else {
      return data.filter((post) => {
        for (let i = 0; i < post.categories.length; i++) {
          if (filterQuery.includes(post.categories[i].name)) return true
        }
        return false
      })
    }
    }

    // Function to change Filter Query
    const handleFilter = (e) => {
      let category = e.target.name;
      let categoryIndex = filterQuery.indexOf(category);
      
      if (categoryIndex < 0) {
        setFilterQuery([...filterQuery, category])
      } else {
        setFilterQuery(filterQuery.filter((cat) => cat !== category));
      }
      
    }

    // Function to return more results (Pagination)
    // I chose this method of Pagination as the API returned a set amount of values
    const handlePagination = () => {
      let newResults = results + 10
      if (newResults > posts.length) {
        setResults(posts.length)
      } else {
        setResults(newResults)
      }
    }

  return (
    <Wrapper>
      <FilterContainer>
        <div>
        <Search>
        <label>
          Search: <input
            name="filter-input-field"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Categories..."
          >  
          </input>
          </label>
          </Search>
          <Filter>
          Filter:  
          {categories.map((cat, index) => {
            return (
              <label>
                <input 
                  key={index}
                  name={cat}
                  type="checkbox"
                  checked={filterQuery.indexOf(cat) > -1}
                  onChange={handleFilter}
                  />
                  {cat}
                </label>
              )
          })}
          </Filter>
        </div>
      </FilterContainer>
      <DataTable data={search(filter(posts)).slice(0, results)} />
      <Pagination>
        <p>Showing {search(filter(posts)).slice(0, results).length} of {search(filter(posts)).length}</p>
        {/* Hide button if results if greater than or equal to the total number of available posts */}
        {results >= search(filter(posts)).length ? '' : <button onClick={handlePagination}>Show More</button>}
      </Pagination>
    </Wrapper>
  );
}

const Wrapper = styled.main`
    top: 112px;
    position: relative;
    width: 100%;
    min-height: calc(100vh - 112px);
  `;

  const FilterContainer = styled.div`
  max-width: 100%;
  min-height: 100px;
  padding: 10px;
  display: flex;
  align-items: center;
  position: relative;
  `;

  const Search = styled.div`
  display: block;
  `;

  const Filter = styled.div`
  width: 100%;
  height: fit-content;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  
  

  label {
    font-size: 12px;
    position: relative;
    padding: 4px 8px;
    margin: 4px;
    background-color: #F5F5F5;
    border: 1px solid #D5D5D5;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 768px) {
      font-size: 10px;
      padding: 2px 4px;

      input {
        width: 5px;
        height: 5px;
        border-radius: 50%;
      }
    }

    &:hover {
      background-color: #D5D5D5;
    }
    
    &input[type=checkbox]:checked {
      background-color: #D5D5D5;
    }
  }
  `;

  const Pagination = styled.div`
  width: 100%;
  min-height: 50px;
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;

export default Hero;
