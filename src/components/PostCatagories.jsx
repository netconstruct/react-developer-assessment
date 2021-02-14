import styled from 'styled-components';

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Chip = styled.div`
  margin: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  background-color: darkblue;
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
`;

function PostCategories({ categories }) {
  return (
    <ChipContainer>
      Categories:
      {categories.map((category) => (
        <Chip key={category.id}>{category.name}</Chip>
      ))}
    </ChipContainer>
  );
}

export default PostCategories;
