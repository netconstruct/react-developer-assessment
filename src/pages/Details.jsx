import { Link } from 'react-router-dom';
import { ActionButton } from '../styledComponents/ActionButton';
import { ArticleContainer } from '../styledComponents/ArticleContainer';
import PostTitle from '../components/PostTitle';
import PostListDetails from '../components/PostListDetails';
import PostCategories from '../components/PostCatagories';
import styled from 'styled-components';

const Avatar = styled.img`
  max-height: 4.5rem;
  max-width: 4.5rem;
`;

const PostContent = styled.div`
  overflow: auto;
  margin: 0.5rem 1rem;
  border: 1px solid darkgray;
  min-height: 65vh;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const ArticleHeader = styled.div`
  margin: 0.5rem 1rem;
`;

function Details({ selectedPost }) {
  return (
    <ArticleContainer>
      <ArticleHeader>
        <PostTitle title={selectedPost.title} />
        <Avatar src={selectedPost.author.avatar} alt="Authors Avatar" />
        <PostListDetails
          author={selectedPost.author.name}
          publishedDate={selectedPost.publishDate}
        />

        <PostCategories categories={selectedPost.categories} />
      </ArticleHeader>
      <PostContent>{selectedPost.summary}</PostContent>
      <Link to="/">
        <ActionButton>Back</ActionButton>
      </Link>
    </ArticleContainer>
  );
}

export default Details;
