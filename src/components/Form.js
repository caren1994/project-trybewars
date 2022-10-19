import { useContext } from 'react';
import AppContext from '../Context/AppContext';

function App() {
  const { inputText, setInputText } = useContext(AppContext);
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
    </form>

  );
}

export default App;
