import styled from 'styled-components';

const FilterContainer = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid lightgray;
  max-width: 95vw;
  margin-left: 2.5rem;
  background-color: white;
`;

const FilterLabel = styled.label`
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  min-width: 100%;
  font-size: 0.9rem;
`;

function Filters({ filters, updateFilterValue, toggleRenderLoadingSpinner }) {
  const handleChange = (event) => {
    toggleRenderLoadingSpinner(true);
    updateFilterValue(event.target.value);
  };

  return (
    <FilterContainer>
      <FilterLabel htmlFor="filters">Post filters:</FilterLabel>
      <Select
        id="filters"
        onChange={(event) => {
          handleChange(event);
          setTimeout(() => toggleRenderLoadingSpinner(false), 200);
        }}
      >
        <option value="All">All</option>;
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </Select>
    </FilterContainer>
  );
}

export default Filters;
