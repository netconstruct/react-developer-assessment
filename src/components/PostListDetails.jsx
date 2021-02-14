import styled from 'styled-components';
import formatDate from '../utils/formatDate';

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const Author = styled.h3`
  margin: 0.2rem 0;
`;

const Published = styled.h5`
  margin: 0.2rem 0;
  color: #616161;
`;

function PostListDetails({ author, publishedDate }) {
  return (
    <PostDetails>
      <Author>Written By: {author}</Author>
      <Published>Published: {formatDate(publishedDate)}</Published>
    </PostDetails>
  );
}

export default PostListDetails;
