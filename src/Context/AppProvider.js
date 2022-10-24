import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

// codigo comentado para ajudar melhor na mentoria

const arrayOfColumn = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  // array de column usado nos states

function AppProvider({ children }) {
  const [data, setData] = useState([]);// estado q guarda result da api
  const [inputText, setInputText] = useState(''); // guarda o valor do input texto de pesquisa
  const [columnNew, setColumnNew] = useState(arrayOfColumn); // guarda todos os tipos de coluna no input
  const [columnFilter, setColumnFilter] = useState(arrayOfColumn[0]); // guarda o valor do input de coluna
  const [filters, setFilters] = useState([]); // guarda todos os filtros
  const [comparisonFilter, setComparisonFilter] = useState('maior que'); // quarda o valor do input de comparação
  const [initialValue, setInitialValue] = useState([]); // copia do retorno da api usado como reset
  const [number, setNumber] = useState(0); // guarda o valor do input que digita o numero
  const [sort, setSort] = useState('ASC'); // guarda o valor do input de asc e desc
  const [columnFiltersort, setColumnFilterSort] = useState('population'); //

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const nova = results.filter((e) => e !== e.residents);
      // /* retiro a chave residents do resultado da api*/
      setData(nova);
      // guardo o resultado na variável
      setInitialValue(nova);
      // guardo uma cópia do original em outro estado para ser utilizado como reset na página mais tarde
    };
    requestApi();
    // chamo a função que faz a requisição a api
  }, []);

  // e[columnFilter]:retorna o valor da chave

  const handleFilter = useCallback(() => {
    if (comparisonFilter.includes('maior que')) {
      const filtrado = data.filter((e) => Number(e[columnFilter]) > Number(number));
      // filtra o valor da coluna escolhida com o numero e a comparação escolhida e retorna um array novo
      setColumnNew(columnNew.filter((e) => e !== columnFilter));
      // recebe lá no columnNew todas as colunas possíveis menos a que ja foi escolhida
      setColumnFilter(columnNew[0]);
      // coloca o valor inicial no columnFilter o primeiro elemento do array do columnNew
      setData(filtrado); // recebe o valor filtrado no data q vai ser renderizado no table
      setFilters([...filters,
        { columnFilter, comparisonFilter, number, arr: filtrado }]);
    } else if (comparisonFilter.includes('menor que')) {
      const filtrado = data.filter((e) => Number(e[columnFilter]) < Number(number));
      setColumnNew(columnNew.filter((e) => e !== columnFilter));
      setColumnFilter(columnNew[0]);
      setData(filtrado);

      setFilters([...filters,
        { columnFilter, comparisonFilter, number, arr: filtrado }]);
    } else if (comparisonFilter.includes('igual a')) {
      const filtrado = data.filter((e) => Number(e[columnFilter]) === Number(number));
      setColumnNew(columnNew.filter((e) => e !== columnFilter));
      setColumnFilter(columnNew[0]);
      setData(filtrado);
      setFilters([...filters,
        { columnFilter,
          comparisonFilter,
          number,
          arr: filtrado }]); // faz um estado com todos os filtros , o valor antigo(..filters)e o novo + o data filtrado e retornado de acordo com o filtro
    }
  }, [columnFilter, comparisonFilter, data, filters, columnNew, number]);

  const excluirFiltros = useCallback(() => {
    setData(initialValue);// reseta o table com oq vem da api sem filtros
    setColumnNew(arrayOfColumn);// reseta a coluna com todas as opcoes
    setFilters([]);// sera o estado com os filtros
  }, [initialValue]);

  const excluirFiltro = useCallback((element) => {
    if (filters.length === 1) {
      setData(initialValue);
      setColumnNew(arrayOfColumn);
      setFilters([]);
    }
    if (filters.length >= 2) { // se tiver + que 2 filtros ou 2 filtros
      const filter = filters.filter((e) => e.columnFilter !== element.columnFilter);// retorna no array do filter os filtros com a coluna diferente da que foi excluida
      setFilters(filter);// atualiza o array de filtros com a condição acima
      setColumnNew([...columnNew, element.columnFilter]);// volta o column que foi excluido do filter,element.columnFilter(vem do parametro)
      setData(filters[filters.length - 2].arr); // data recebe
    }
  }, [filters, columnNew, initialValue]);

  const handleButtonSort = useCallback(() => {
    if (sort.includes('ASC')) {
      const desconhecida = data.filter((e) => e[columnFiltersort] === 'unknown'); // faz um array só com oq tiver unknown
      const conhecida = data.filter((e) => e[columnFiltersort] !== 'unknown');// faz um array do que nao tiver unknown
      const arraysort = conhecida
        .sort((a, b) => Number(a[columnFiltersort]) - Number(b[columnFiltersort]));// coloca na ordem escolhida
      setData([...arraysort, ...desconhecida]); // envia para o data primeiro os q nao tem unknown e depois colocas o unknown
    } else if (sort.includes('DESC')) {
      const desconhecida = data.filter((e) => e[columnFiltersort] === 'unknown');
      const conhecida = data.filter((e) => e[columnFiltersort] !== 'unknown');
      const arraysort = conhecida
        .sort((a, b) => Number(b[columnFiltersort]) - Number(a[columnFiltersort]));
      setData([...arraysort, ...desconhecida]);
    }
  }, [columnFiltersort, sort, data]);

  const contexto = useMemo(() => ({
    data,
    setData,
    inputText,
    setInputText,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    number,
    setNumber,
    columnNew,
    setColumnNew,
    filters,
    setFilters,
    arrayOfColumn,
    initialValue,
    setInitialValue,
    handleFilter,
    excluirFiltros,
    handleButtonSort,
    columnFiltersort,
    setColumnFilterSort,
    setSort,
    excluirFiltro,

  }), [data,
    inputText,
    columnFilter,
    comparisonFilter,
    number, columnNew,
    filters, initialValue,
    handleFilter, excluirFiltros,
    handleButtonSort,
    columnFiltersort,
    setColumnFilterSort,
    setSort, arrayOfColumn, excluirFiltro]);

  return (
    <AppContext.Provider value={ contexto }>
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProvider;
