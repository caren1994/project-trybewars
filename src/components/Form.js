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
      <h1 className="titulo"> Projeto Star Wars - Trybe</h1>
      <label className="label" htmlFor="pesquisa">
        Pesquisar:
        <input
          className="inputs1"
          data-testid="name-filter"
          type="text"
          id="pesquisa"
          value={ inputText }
          onChange={ ({ target }) => setInputText(target.value) }
        />
      </label>
      <label className="inputs" htmlFor="columnfilter">

        <select
          className="select1"
          name="columnfilter"
          id="columnfilter"
          value={ columnFilter }
          data-testid="column-filter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {columnNew.map((e, index) => (
            <option className="option" key={ index } value={ e }>
              {e}
            </option>))}
        </select>
      </label>
      <label className="inputs" htmlFor="comparison-filter">

        <select
          className="select1"
          name="comparison-filter"
          id="comparison-filter"
          value={ comparisonFilter }
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option className="option" value="maior que">maior que</option>
          <option className="option" value="menor que">menor que</option>
          <option className="option" value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          className="inputs1"
          type="number"
          id="number"
          value={ number }
          data-testid="value-filter"
          onChange={ ({ target }) => setNumber(target.value) }
        />
      </label>
      <button
        className="filtrar"
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
        className="excluir"
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
        <p className="label">Filtros Selecionados:</p>
        {
          filters?.map((e, i) => (
            <div data-testid="filter" key={ i }>
              <p>{`${e.columnFilter} ${e.comparisonFilter} ${e.number}`}</p>
              <button
                className="x"
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
          className="select"
          data-testid="column-sort"
          value={ columnFiltersort }
          onChange={ ({ target }) => setColumnFilterSort(target.value) }
        >
          {' '}
          Order:
          {
            arrayOfColumn.map((e) => (
              <option className="option" key={ e } value={ e }>{e}</option>))
          }
        </select>
        <label className="label" htmlFor="sort-asc">
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
        <label className="label" htmlFor="sort-desc">
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
          className="ordenar"
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
