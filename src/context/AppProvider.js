/* eslint-disable react-hooks/exhaustive-deps */

// Importaçào do React e dos Hooks
import React, { useState, useEffect } from 'react';
// Importação das PropTypes
import PropTypes from 'prop-types';
// Importação do Context
import AppContext from './AppContext';
// Importação da função requestAPI
import fetchAPI from '../services/requestAPI';

const AppProvider = ({ children }) => {
  // Opções para filtragem numérica (req3)
  const OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  // Constantes para evitar warning de número mágico
  const ONE = 1;
  const NEG_ONE = -1;

  // Criação dos estados com useState
  const [data, setData] = useState([]);
  const [APIResult, setAPIResult] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  // Ordena a tabela em ASC ou DESC
  const sortData = (toFilterData) => {
    // Busca a order da tabela no estado filters
    const { order: { column, sort } } = filters;

    // Recebe a coluna para ordenação e garante que seja em minusculo
    const info = column.toLowerCase();

    // Ordenação via campos numéricos (só é ativada após o usuário selecionar uma coluna)
    if (OPTIONS.includes(info)) {
      // Ordenação em ordem Crescente
      if (sort === 'ASC') {
        return (
          // https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a
          // Converte os valores para Numeros e verifica a diferença desses campos
          // Se a diferença for menor que 0 a vem antes
          // Se a diferença for maior que 0 b vem antes
          toFilterData.sort((a, b) => (Number(a[info]) - Number(b[info]))));
      }
      return (
        toFilterData.sort((a, b) => (Number(b[info]) - Number(a[info]))));
    }

    // Ordenação pelo nome
    // Ref: https://www.edsonemiliano.com.br/blog/como-ordenar-uma-array-de-objetos-com-javascript-sort/
    if (sort === 'ASC') {
      return (
        toFilterData.sort((a, b) => {
          if (a[info] > b[info]) return ONE;
          if (a[info] < b[info]) return NEG_ONE;
          return 0;
        }));
    }
  };

  // Realiza a requisição na API
  const getPlanets = async () => {
    // Endpoint da API
    const url = 'https://swapi-trybe.herokuapp.com/api/planets';

    // Resultado da requisição
    const planets = await fetchAPI(url);

    // Deleta os residentes de cada planeta
    planets.forEach((planet) => delete planet.residents);

    // Realiza o tratamento nas chaves que serão colunas da tabela
    const heading = Object.keys(planets[0]).map((info) => info.replace('_', ' '));

    // Seta os valores nos estados
    setData(planets);
    setAPIResult(planets);
    setHeadings(heading);
  };

  useEffect(() => {
    // Chamada da API
    getPlanets();

    // Função para filtrar de acordo com valor informado pelo usuário
    const filterData = () => {
      // Variável que recebera os resultados
      let result;
      // Busca os filtros numéricos
      const { filterByNumericValues } = filters;

      // Função para gerar os dados ordenados
      const newData = () => {
        // Realiza um for nos filtros numéricos
        filterByNumericValues.forEach(({ comparison, column, number }) => {
          // Busca o valor que o usuário informou
          const getNumber = Number(number);

          // Verifica qual o método de comparação
          if (comparison === 'menor que') {
            // Filtra os resultados de acordo com o método escolhido (menores que o valor)
            result = data.filter((el) => Number(el[column]) < getNumber);
          } else if (comparison === 'maior que') {
            // Filtra os resultados de acordo com o método escolhido (maiores que o valor)
            result = data.filter((el) => Number(el[column]) > getNumber);
          } else {
            // Filtra os resultados de acordo com o método escolhido (iguais ao valor)
            result = data.filter((el) => Number(el[column]) === getNumber);
          }
        });
      };
      // Chamada da função
      newData();
      // Seta os novos dados ordenados
      setAPIResult(result);
    };

    // Só realiza a chamada da função quando realmente existir algum filtro
    if (filters.filterByNumericValues[0]) { filterData(); }
  }, [filters.filterByNumericValues, filters.order]);

  // Váriavel para guardar o nome digitado pelo usuário
  const nameFilter = filters.filterByName.name;

  // Valores e funções que ficarão disponiveis para os filhos
  const context = {
    APIResult,
    setAPIResult,
    headings,
    filters,
    setFilters,
    nameFilter,
    OPTIONS,
    sortData,
  };

  // Retorna o Provider com o value context para todos os seus filhos
  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
};

// PropTypes
AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
}.isRequired;

// Exportação padrão
export default AppProvider;
