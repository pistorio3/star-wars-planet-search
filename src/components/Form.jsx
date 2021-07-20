import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import SortTable from './Sort';

function Form() {
  const { filters, setFilters, OPTIONS } = useContext(AppContext);

  const [options, setOptions] = useState(OPTIONS);
  const [numericFilter, setNumericFilter] = useState({
    comparison: 'maior que',
    column: 'population',
    number: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: { name: value.toLowerCase() },
    });
  };

  const handleClick = () => {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.concat(numericFilter) });

    const newOptions = OPTIONS.filter((element) => numericFilter.column !== element);
    setOptions(newOptions);
  };

  const handleComparisonFilters = ({ target: { name, value } }) => {
    setNumericFilter({ ...numericFilter, [name]: value });
  };

  const resetFilters = ({ target: { name } }) => {
    const { filterByNumericValues } = filters;
    const newValues = filterByNumericValues.filter(({ column }) => column !== name);

    setFilters({
      ...filters,
      filterByNumericValues: newValues,
    });
  };

  return (
    <header>
      <form>
        <label htmlFor="filterByName">
          { 'Filter by name: ' }
          <input
            id="filterByName"
            name="filterByName"
            data-testid="name-filter"
            type="text"
            onChange={ handleChange }
          />
        </label>

        <div>
          { 'Filter by: ' }
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleComparisonFilters }
          >
            {options.map((element, index) => (
              <option key={ index } value={ element }>{ element }</option>
            ))}
          </select>

          <select
            name="comparison"
            data-testid="comparison-filter"
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
              onChange={ handleComparisonFilters }
            />
          </label>
          <button
            data-testid="button-filter"
            type="button"
            disabled={ (!numericFilter.comparison
              || !numericFilter.column
              || !numericFilter.number) }
            onClick={ handleClick }
          >
            Filter
          </button>
          {filters.filterByNumericValues.map(({ column, comparison, number }, index) => (
            <div
              key={ index }
              data-testid="filter"
            >
              <span>{ `${column} ${comparison} ${number} ` }</span>
              <button
                type="button"
                name={ column }
                onClick={ resetFilters }
              >
                X
              </button>
            </div>
          ))}
        </div>
        <SortTable />
      </form>
    </header>
  );
}

export default Form;
