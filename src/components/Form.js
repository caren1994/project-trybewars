import { useContext } from 'react';
import AppContext from '../Context/AppContext';

function Form() {
  const { inputText, setInputText,
    columnFilter, setColumnFilter,
    comparisonFilter, setComparisonFilter,
    number, setNumber, columnNew, filters, handleFilter,
    excluirFiltros, handleButtonSort,
    columnFiltersort,
    setColumnFilterSort,
    setSort, arrayOfColumn, excluirFiltro,

  } = useContext(AppContext);

  return (
    <form>
      <h1> Projeto Star Wars - Trybe</h1>
      <label htmlFor="pesquisa">
        Pesquisar:
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
      <div>

        {
          filters.length > 0
  && (
    <div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ excluirFiltros }
      >
        Excluir
      </button>
    </div>
  )
        }
      </div>
      <div>
        <p>Filtros Selecionados:</p>
        {
          filters?.map((e, i) => (
            <div data-testid="filter" key={ i }>
              <p>{`${e.columnFilter} ${e.comparisonFilter} ${e.number}`}</p>
              <button
                type="button"
                onClick={ () => excluirFiltro(e) }
              >
                X
              </button>

            </div>
          ))
        }
      </div>

      <div>
        <select
          data-testid="column-sort"
          value={ columnFiltersort }
          onChange={ ({ target }) => setColumnFilterSort(target.value) }
        >
          {' '}
          Order:
          {
            arrayOfColumn.map((e) => (<option key={ e } value={ e }>{e}</option>))
          }
        </select>
        <label htmlFor="sort-asc">
          Ascendente
          <input
            type="radio"
            name="sort"
            id="sort-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ ({ target }) => setSort(target.value) }
          />

        </label>
        <label htmlFor="sort-desc">
          Descendente
          <input
            type="radio"
            name="sort"
            id="sort-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ ({ target }) => setSort(target.value) }
          />

        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleButtonSort }
        >
          ORDENAR
        </button>
      </div>
    </form>

  );
}

export default Form;
