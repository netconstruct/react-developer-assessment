function Filters({ filters }) {
  console.log({ filters });
  return <div>THESE ARE FILTERS {filters.map((filter) => filter)}</div>;
}

export default Filters;
