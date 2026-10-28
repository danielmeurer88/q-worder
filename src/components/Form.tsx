import { useContext, useEffect, useState, type PointerEvent } from 'react';
import { TextAreaBox } from './form-elements/TextAreaBox';
import { WordField } from './form-elements/WordField';
import styles from './Form.module.css';
import { getWords, type Words } from '../shared/functions';
import { wordFulfillRule, type Rule } from '../shared/rules';
import { WordsStateContext } from '../shared/words-state.context';


let words: Words;

export function Form() {

  const [possibleSolutions, setPossibleSolutions] = useState('');

  const wordsState = useContext(WordsStateContext);

  let updateOnChange = true;

  const resetHandle = (e: PointerEvent<HTMLButtonElement>) => {
    console.log('reset', e);
    if (wordsState) {
      wordsState.green = '     ';
      wordsState.yellows = '';
      wordsState.greys = '';
      wordsState.rules = [];
    }

    setPossibleSolutions('');
  };

  const wordChangeHandle = (word: string) => {
    console.log('word changed', word);
    if (wordsState) {
      wordsState.green = word;
    }

    if (updateOnChange) {
      updateResult();
    }

  };

  const yellowLettersChangeHandle = (letters: string) => {
    console.log('yellow letters changed', letters);
    if (wordsState) {
      wordsState.yellows = letters;
    }
    if (updateOnChange) {
      updateResult();
    }
  };

  const greyLettersChangeHandle = (letters: string) => {
    console.log('grey letters changed', letters);
    if (wordsState) {
      wordsState.greys = letters;
    }
    if (updateOnChange) {
      updateResult();
    }
  };

  const updateResult = () => {

    let rules: Rule[] = [];
    let posWords: string[] = [];

    // green
    wordsState?.green.split('').map((char, i) => {
      if (char !== ' ') {
        rules.push({
          char,
          pos: i + 1 as any,
          type: 'IS'
        });
      }
    });

    // yellow
    wordsState?.yellows.split('').map(char => {
      if (char !== ' ') {
        rules.push({
          char,
          type: 'MUST_INCLUDE'
        });
      }
    });

    // greys
    wordsState?.greys.split('').map(char => {
      if (char !== ' ') {
        rules.push({
          char,
          type: 'NOT_INCLUDING'
        });
      }
    });

    // get possible solutions
    words.solutions.forEach(word => {

      if (rules.every(rule => wordFulfillRule(word, rule))) {
        posWords.push(word);
      }

    });

    setPossibleSolutions(posWords.join(', '));

  }

  useEffect(() => {
    words = getWords();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div>
          <button onClick={resetHandle}>RESET</button>
        </div>
        <WordField onChange={wordChangeHandle} />
        <TextAreaBox onChange={yellowLettersChangeHandle} type='yellow' />
        <TextAreaBox onChange={greyLettersChangeHandle} type='grey' />
        <div className={`${styles['words-box']} ${styles['words-box-solutions']}`}>
          { possibleSolutions }
        </div>
      </div>
    </div>
  );
}

