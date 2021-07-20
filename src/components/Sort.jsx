import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Sort() {
  const { OPTIONS, filters, setFilters } = useContext(AppContext);
  const [localOrder, setLocalOrder] = useState({ column: 'population' });

  const handleChange = ({ target: { name, value } }) => {
    setLocalOrder({ ...localOrder, [name]: value });
  };

  const handleClick = () => {
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
