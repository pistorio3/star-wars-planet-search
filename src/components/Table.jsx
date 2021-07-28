// Importação do React e dos Hooks
import React, { useContext, useEffect, useState } from 'react';
// Importação do Context
import AppContext from '../context/AppContext';

function Table() {
  // Busca no Context as variáveis e funções necessárias
  const { sortData, headings, APIResult, nameFilter } = useContext(AppContext);

  // Cria um estado para salvar o conteúdo que sera renderizado
  const [toRender, setToRender] = useState([]);

  useEffect(() => {
    // Recebe os planetas correspondentes ao nome digitado no input
    const filteredData = APIResult.filter(({ name }) => (
      name.toLowerCase().includes(nameFilter))).map((planet) => planet);

    // Recebe os dados ordenados
    const APISorted = sortData(APIResult);

    // Caso exista nome digitado mostra os planetas correspondentes
    // Caso não mostra os valores ordenados por nome (forma default)
    const data = nameFilter ? filteredData : APISorted;

    // Seta o conteudo a ser renderizado
    setToRender(data);
  }, [nameFilter, APIResult, sortData]);

  // Funçào Render Headings - Realiza a renderização dos títulos das colunas
  const renderHeadings = () => (
    // Utiliza o <th> para ficar em negrito
    headings.map((heading, index) => (<th key={ index }>{ heading }</th>))
  );

  return (
    <table>
      <thead>
        <tr>
          {/* Chamada da função renderHeadings */}
          { renderHeadings() }
        </tr>
      </thead>

      <tbody>
        {/* Realiza um Map para renderizar os planetas e suas colunas */}
        { toRender.map((planets, index) => (
          <tr key={ index }>
            <td
              data-testid="planet-name"
            >
              { planets.name }
            </td>
            <td>{ planets.rotation_period }</td>
            <td>{ planets.orbital_period }</td>
            <td>{ planets.diameter }</td>
            <td>{ planets.climate }</td>
            <td>{ planets.gravity }</td>
            <td>{ planets.terrain }</td>
            <td>{ planets.surface_water }</td>
            <td>{ planets.population }</td>
            <td>{ planets.films }</td>
            <td>{ planets.createt }</td>
            <td>{ planets.edited }</td>
            <td>{ planets.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

// Exportação padrão
export default Table;
