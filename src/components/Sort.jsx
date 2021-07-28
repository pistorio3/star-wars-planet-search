// Importação do React e dos Hooks
import React, { useContext, useState } from 'react';
// Importação do Context
import AppContext from '../context/AppContext';

function Sort() {
  // Busca no Context os filtros e OPTIONS
  const { OPTIONS, filters, setFilters } = useContext(AppContext);

  // Cria um estado para armazenar a coluna para ordenação da tabela
  const [localOrder, setLocalOrder] = useState({ column: 'population' });

  // Função Handle Change - Verifica a mudança na seleção das colunas para ordenação
  const handleChange = ({ target: { name, value } }) => {
    // Seta o novo valor para ordenação
    setLocalOrder({ ...localOrder, [name]: value });
  };

  // Função Handle Click - Ao clicar no botão SORT passa para os filtros a nova ordenação
  const handleClick = () => {
    // Seta a nova ordenação fazendo spread para manter os valores existentes
    setFilters({
      ...filters,
      order: { ...localOrder } });
  };

  return (
    <div className="sort-container">
      { 'Sort by: '}
      <select
        id=""
        name="column"
        data-testid="column-sort"
        onChange={ handleChange }
      >
        {/* Realiza um Map para renderizar as colunas para ordenação */}
        { OPTIONS.map((data, index) => (
          <option
            key={ index }
            value={ data }
          >
            { data }
          </option>
        ))}
      </select>
      <div className="radiobtn-container">
        <label
          htmlFor="column-sort-input-asc"
        >
          { 'Ascendent ' }
        </label>
        <input
          id="column-sort-input-asc"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          type="radio"
          onClick={ handleChange }
        />

        <label
          htmlFor="column-sort-input-desc"
        >
          { 'Descendent ' }
        </label>
        <input
          id="column-sort-input-desc"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          type="radio"
          onClick={ handleChange }
        />
      </div>

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleClick }
      >
        SORT
      </button>
    </div>
  );
}

export default Sort;
