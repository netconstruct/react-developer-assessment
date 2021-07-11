import React from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Detail(props) {

  // useHistory hook to allow .goBack() on return button in page
  // useLocation hook to allow props to be passed via react-router

  const history = useHistory();
  const location = useLocation();
  // Destructor details from props.location.state
  const { details } = location.state;

  console.log(details)

  return (
    <Container>
    <PostWrapper>
      <h2>{details.title}</h2>
      <p><span>Publish Date:</span> {details.publishDate}</p>
      <AuthorContainer>
        <img src={details.author.avatar} alt={details.author.name} />
        <h3>{details.author.name}</h3>
      </AuthorContainer>
      <h4>Summary: </h4>
      <p>{details.summary}</p>
      <CategoriesContainer>
        <h4>Categories:</h4>
        <ul>
          {details.categories.map((cat) => <li key={cat.id}>{cat.name}</li>)}
        </ul>
      </CategoriesContainer>
    </PostWrapper>
    {/* Added a go back button as an additional CTA */}
    <BackButton onClick={() => history.goBack()}>
        <ArrowBackIosIcon/>
        Go Back
      </BackButton>
    </Container>
  )
}

const Container = styled.section`
position: relative;
width: 100%;
top: 112px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const BackButton = styled.a `
  text-decoration: none;
  margin-top: 10px;
  width: fit-content;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  border: 1px solid #D5D5D5;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #D5D5D5;
  }
}
`;

const PostWrapper = styled.div`
padding: 10px;
@media only screen and (max-width: 768px) {
  width: 100%;
}
span {
  color:#3bb599;
  }
`;

const AuthorContainer = styled.div`
display: flex;
align-items: center;
margin: 25px 0;
`;

const CategoriesContainer = styled.div`
margin-top: 25px;

ul li {
  list-style: none;
  font-style: italic;
  margin-bottom: 2px;
}
`;

export default Detail
