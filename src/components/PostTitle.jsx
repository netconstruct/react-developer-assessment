import styled from 'styled-components';

const Title = styled.h1`
  margin: 0 0 0.5rem 0;
  text-transform: capitalize;
`;

function PostTitle({ title }) {
  return <Title>{title}</Title>;
}

export default PostTitle;
