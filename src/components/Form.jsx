// Importaçào do React e dos Hooks
import React, { useContext, useState } from 'react';
// Importação do Context
import AppContext from '../context/AppContext';
// Importação do componente Sort
import SortTable from './Sort';

function Form() {
  // Busca no Context os filtros e as opções de filtragem
  const { filters, setFilters, OPTIONS } = useContext(AppContext);

  // Cria um estado para armazenar as OPTIONS e retirar os filtros usados
  const [options, setOptions] = useState(OPTIONS);

  // Cria um estado para armazenar os filtros numéricos (req3)
  const [numericFilter, setNumericFilter] = useState({
    comparison: 'maior que',
    column: 'population',
    number: '',
  });

  // Função Handle Change - Seta o valor do filtro por nome
  const handleChange = ({ target: { name, value } }) => {
    setFilters({
      // Spread do valor existente
      ...filters,
      // Concatenação dos novos valores convertidos para minusculo
      [name]: { name: value.toLowerCase() },
    });
  };

  // Função Handle Click - Seta o filtro após o click do botão
  const handleClick = () => {
    // Desestrutura os filtros por valores numéricos
    const { filterByNumericValues } = filters;
    // Seta os filtros
    setFilters({
      // Spread dos filtros existentes
      ...filters,
      // Concatena os filtros que vão sendo adicionados
      filterByNumericValues: filterByNumericValues.concat(numericFilter) });

    // Cria uma nova lista de OPTIONS retirando o último filtro adicionado
    const newOptions = options.filter((element) => numericFilter.column !== element);
    // Seta a nova lista de filtros disponíveis
    setOptions(newOptions);
  };

  // Função Handle Comparison Filters - Seta o filtro numérico de acordo com a seleção do usuário
  const handleComparisonFilters = ({ target: { name, value } }) => {
    // Busca um target, faz o spread dos campos anteriores e adiciona os novos
    setNumericFilter({
      ...numericFilter,
      [name]: value });
  };

  // Função Reset Filters - Retira um filtro aplicado ao clicar no X do botão
  const resetFilters = ({ target: { name } }) => {
    // Busca os filtros numéricos
    const { filterByNumericValues } = filters;
    // Filtra e traz somente os filtros que não foram retirados
    const newValues = filterByNumericValues.filter(({ column }) => column !== name);
    // Seta os filtros que ficaram, fazendo spread para não sobrescrever
    setFilters({
      ...filters,
      filterByNumericValues: newValues,
    });
  };

  return (
    <header>
      <form>
        {/* Input para busca por texto */}
        <label htmlFor="filterByName">
          { 'Filter by name: ' }
          <input
            type="text"
            id="filterByName"
            name="filterByName"
            data-testid="name-filter"
            onChange={ handleChange }
          />
        </label>

        {/* Select de colunas para busca por comparação numérica */}
        <div>
          { 'Filter by: ' }
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleComparisonFilters }
          >
            {/* Map para renderizar as colunas disponiveis */ }
            {options.map((element, index) => (
              <option key={ index } value={ element }>{ element }</option>
            ))}
          </select>

          {/* Select de maior, menor e igual para busca por comparação numérica */}
          <select
            name="comparison"
            data-testid="comparison-filter"
            // Chamada da função handleComparisonFilters
            onChange={ handleComparisonFilters }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <label htmlFor="filterByName">
            { 'Filter value: ' }
            <input
              data-testid="value-filter"
              name="number"
              type="number"
              // Chamada da função handleComparisonFilters
              onChange={ handleComparisonFilters }
            />
          </label>
          <button
            data-testid="button-filter"
            type="button"
            // O botão Filter fica desabilitado até entrar com valores
            disabled={ (
              !numericFilter.comparison
              || !numericFilter.column
              || !numericFilter.number) }
            // Chamada da função handleClick
            onClick={ handleClick }
          >
            Filter
          </button>
          {/* Mostra na tela quais os filtros selecionados */}
          {filters.filterByNumericValues.map(({ column, comparison, number }, index) => (
            <div
              key={ index }
              data-testid="filter"
            >
              {/* Mostra qual a coluna a comparação e o valor inserido */}
              <span>{ `${column} ${comparison} ${number} ` }</span>
              <button
                type="button"
                name={ column }
                // Chamada da função resetFilters
                onClick={ resetFilters }
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* Chama o componente Sort */}
        <SortTable />
      </form>
    </header>
  );
}

// Exportação padrão
export default Form;
