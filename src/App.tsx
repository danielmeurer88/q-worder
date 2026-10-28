import { Form } from './components/Form';
import { WordsStateContext } from './shared/words-state.context';

function App() {

  return (
    <WordsStateContext.Provider value={{
      green: '     ',
      yellows: '',
      greys: '',
      rules: []
    }}>
      <Form />
    </WordsStateContext.Provider>
);
}

export default App;
