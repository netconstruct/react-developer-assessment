function generateAvailableFilters(data) {
  const filtersArray = [];
  //loop over the api data and extract all category names. We need these to generate the available filter options
  data.forEach((item) =>
    item.categories.forEach((category) => filtersArray.push(category.name))
  );

  //return a new array of unique values
  return [...new Set(filtersArray)];
}

export default generateAvailableFilters;
