// lógica da requisição usando fetch
const fetchAPI = async (url) => (
  // Realiza o fetch na url
  fetch(url)
    // Converte os dados para JSON
    .then((data) => data.json())
    // Desestrutura o results
    .then(({ results }) => results)
);

// exportação padrão
export default fetchAPI;
