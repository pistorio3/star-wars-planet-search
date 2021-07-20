const fetchAPI = async (url) => (
  fetch(url)
    .then((data) => data.json())
    .then(({ results }) => results)
);

export default fetchAPI;
