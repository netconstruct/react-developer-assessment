function generateFilteredPosts(filterValue, posts) {
  //If the filter value is null return first 10 unfiltered posts
  if (filterValue === 'All') return posts;

  //filter the posts array by checking if the filterValue exists within the posts categories array
  const filteredPosts = posts.filter((post) =>
    post.categories.some((category) => category.name === filterValue)
  );

  return filteredPosts;
}

export default generateFilteredPosts;
