import { WordField } from './form-elements/WordField';
import styles from './Form.module.css';


export function Form() {
  
  return (
    <div className={styles.container}>
      <form className={styles.form} noValidate>
        <WordField />
      </form>
    </div>
  );
}