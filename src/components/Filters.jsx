function Filters({ filters, updateFilterValue }) {
  const handleChange = (event) => {
    updateFilterValue(event.target.value);
  };

  return (
    <>
      <label htmlFor="filters">Post filters:</label>
      <select id="filters" onChange={(event) => handleChange(event)}>
        <option value="All">All</option>;
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </>
  );
}

export default Filters;
