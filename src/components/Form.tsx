import { TextAreaBox } from './form-elements/TextAreaBox';
import { WordField } from './form-elements/WordField';
import styles from './Form.module.css';


export function Form() {

  const wordChangeHandle = (word: string) => {
    console.log('word changed', word);
  };

  const yellowLettersChangeHandle = (letters: string) => {
    console.log('yellow letters changed', letters);
  };

  const greyLettersChangeHandle = (letters: string) => {
    console.log('grey letters changed', letters);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} noValidate>
        <WordField onChange={wordChangeHandle} />
        <TextAreaBox onChange={yellowLettersChangeHandle} type='yellow' />
        <TextAreaBox onChange={greyLettersChangeHandle} type='grey' />
      </form>
    </div>
  );
}
