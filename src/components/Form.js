import { useContext } from 'react';
import AppContext from '../Context/AppContext';

function Form() {
  const { data, setData, inputText, setInputText,
    columnFilter, setColumnFilter,
    comparisonFilter, setComparisonFilter,
    number, setNumber, columnNew, setColumnNew } = useContext(AppContext);

  const handleFilter = () => {
    if (comparisonFilter.includes('maior que')) {
      const filtrado = data.filter((e) => Number(e[columnFilter]) > Number(number));
      setColumnNew(columnNew.filter((e) => e !== columnFilter));
      setColumnFilter(columnNew[0]);
      setData(filtrado);
    } else if (comparisonFilter.includes('menor que')) {
      const filtrado = data.filter((e) => Number(e[columnFilter]) < Number(number));
      setColumnNew(columnNew.filter((e) => e !== columnFilter));
      setColumnFilter(columnNew[0]);
      setData(filtrado);
      console.log(filtrado);
    } else if (comparisonFilter.includes('igual a')) {
      const filtrado = data.filter((e) => Number(e[columnFilter]) === Number(number));
      setColumnNew(columnNew.filter((e) => e !== columnFilter));
      setColumnFilter(columnNew[0]);
      setData(filtrado);
      console.log(filtrado);
    }
  };
  return (
    <form>
      <label htmlFor="pesquisa">
        Projeto Star Wars - Trybe
        <input
          data-testid="name-filter"
          type="text"
          id="pesquisa"
          value={ inputText }
          onChange={ ({ target }) => setInputText(target.value) }
        />
      </label>
      <label className="inputs" htmlFor="columnfilter">

        <select
          className="inputs"
          name="columnfilter"
          id="columnfilter"
          value={ columnFilter }
          data-testid="column-filter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {columnNew.map((e, index) => (
            <option key={ index } value={ e }>
              {e}
            </option>))}
        </select>
      </label>
      <label className="inputs" htmlFor="comparison-filter">

        <select
          className="inputs"
          name="comparison-filter"
          id="comparison-filter"
          value={ comparisonFilter }
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          type="number"
          id="number"
          value={ number }
          data-testid="value-filter"
          onChange={ ({ target }) => setNumber(target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </form>

  );
}

export default Form;
