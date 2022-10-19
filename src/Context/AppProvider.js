import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const nova = results.filter((e) => e !== e.residents);
      setData(nova);
    };
    requestApi();
  }, []);
  const contexto = useMemo(() => ({
    data,
    setData,
    inputText,
    setInputText,
  }), [data, inputText]);

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
