import { Form } from './components/Form';
import { WordsOptionsContext } from './shared/options.context';
import { WordsStateContext } from './shared/words-state.context';

function App() {

  return (
    <WordsOptionsContext.Provider value={{
      useNonSolutions: true,
      showWords: false
    }}>
      <WordsStateContext.Provider value={{
        green: '     ',
        yellows: '',
        greys: '',
        rules: []
      }}>
        <Form />
      </WordsStateContext.Provider>
    </WordsOptionsContext.Provider>
);
}

export default App;
