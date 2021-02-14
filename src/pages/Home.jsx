import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import generateAvailableFilters from '../utils/generateAvailableFilters';
import generateFilteredPosts from '../utils/generateFilteredPosts';

import Filters from '../components/Filters';
import PostTitle from '../components/PostTitle';
import PostListDetails from '../components/PostListDetails';
import LoadingSpinner from '../components/LoadingSpinner';

import { ListItem } from '../styledComponents/ListItem';
import { PageContainer } from '../styledComponents/PageContainer';
import { PostsContainer } from '../styledComponents/PostsContainer';
import { ButtonContainer } from '../styledComponents/ButtonContainer';
import { ActionButton } from '../styledComponents/ActionButton';
import { MoreButton } from '../styledComponents/MoreButton';

function Home({ apiData, setSelectedPost }) {
  const [filterValue, updateFilterValue] = useState('All');
  const [listItems, setListItems] = useState();
  const [paginationValue, setPaginationValue] = useState(10);
  const [renderLoadingSpinner, toggleRenderLoadingSpinner] = useState(false);

  // Here we need to filter the apiData to only return the articles that have a matching category name.
  // This will run every time we update the filter values stored in state or we update the pagination value
  useEffect(() => {
    setListItems(generateFilteredPosts(filterValue, apiData.posts));
  }, [filterValue, apiData, paginationValue]);

  const handleShowPosts = (show) => {
    // As we only make one API call and the filter the data client side we never get a loading state. We are simulating a loading state
    // so we can render a loading spinner so the user knows data is being updated
    toggleRenderLoadingSpinner(!renderLoadingSpinner);
    show === 'remove'
      ? setPaginationValue(paginationValue - 5)
      : setPaginationValue(paginationValue + 5);
  };

  const handleClick = (selectedPost) => {
    setSelectedPost(selectedPost);
  };

  return (
    <>
      {renderLoadingSpinner && <LoadingSpinner />}
      <PageContainer>
        <Filters
          filters={generateAvailableFilters(apiData.posts)}
          updateFilterValue={updateFilterValue}
          toggleRenderLoadingSpinner={toggleRenderLoadingSpinner}
        />

        <PostsContainer>
          <ul>
            {/* Here we slice the listItems array using the pagination value to 
        only return the specified number of filtered posts */}
            {listItems &&
              listItems.slice(0, paginationValue).map((item) => (
                <ListItem key={item.id}>
                  <PostTitle title={item.title} />
                  <PostListDetails
                    author={item.author.name}
                    publishedDate={item.publishDate}
                    avatar={item.author.avatar}
                  />

                  <Link to="/details">
                    <ActionButton onClick={() => handleClick(item)}>
                      View Post
                    </ActionButton>
                  </Link>
                </ListItem>
              ))}
          </ul>
        </PostsContainer>

        {/* Buttons render based on number of posts in the 
      filtered items array vs selected pagination value*/}
        <ButtonContainer>
          {listItems && listItems.length > paginationValue && (
            <MoreButton
              onClick={() => {
                handleShowPosts();
                setTimeout(() => toggleRenderLoadingSpinner(false), 300);
              }}
            >
              Show More....
            </MoreButton>
          )}
          {paginationValue > 10 && (
            <MoreButton
              onClick={() => {
                handleShowPosts('remove');
                setTimeout(() => toggleRenderLoadingSpinner(false), 300);
              }}
            >
              Show Less....
            </MoreButton>
          )}
        </ButtonContainer>
      </PageContainer>
    </>
  );
}

export default Home;
