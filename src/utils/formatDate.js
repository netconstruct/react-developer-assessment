function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
}

export default formatDate;
