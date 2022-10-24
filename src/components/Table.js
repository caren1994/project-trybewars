import { useContext } from 'react';
import AppContext from '../Context/AppContext';

function Table() {
  const { data, inputText } = useContext(AppContext);
  return (
    <table className="tabela">
      <thead>
        <tr>
          <th>Name</th>

          <th>Rotation Period</th>

          <th>Orbital Period</th>

          <th>Diameter</th>

          <th>Climate</th>

          <th>Gravity</th>

          <th>Terrain</th>

          <th>Surface Water</th>

          <th>Population</th>

          <th>Films</th>

          <th>Created</th>

          <th>Edited</th>

          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.filter(
          (e) => e.name.includes(inputText),
        ).map((e) => (
          <tr
            key={ e.name }
          >
            <td data-testid="planet-name">{ e.name }</td>
            <td>{e.rotation_period}</td>
            <td>{e.orbital_period}</td>
            <td>{e.diameter}</td>
            <td>{e.climate}</td>
            <td>{e.gravity}</td>
            <td>{e.terrain}</td>
            <td>{e.surface_water}</td>
            <td>{e.population}</td>
            <td>{e.films.map((film, index) => <span key={ index }>{film}</span>)}</td>
            <td>{e.created}</td>
            <td>{e.edited}</td>
            <td>{e.url}</td>
          </tr>))}

      </tbody>
    </table>
  );
}

export default Table;
