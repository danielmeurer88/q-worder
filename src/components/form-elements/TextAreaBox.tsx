import { useRef, type InputEvent } from "react";
import styles from './TextAreaBox.module.css';
import { cleanTextFromLowerCaseText, getCharFromInputData } from "../../shared/functions";

type TextAreaBoxObject = {
  onChange?: (letters: string) => void;
  type: 'yellow' | 'grey';
};

export function TextAreaBox({onChange, type}: TextAreaBoxObject) {

  const ref = useRef<HTMLTextAreaElement>(null);

  const inputHandle = (e: InputEvent<HTMLTextAreaElement>) => {

    console.log('TextAreaBox', e);

    let newChar = getCharFromInputData(e);

    if (ref.current) {

      let val = cleanTextFromLowerCaseText(ref.current.value || '');

      if (newChar !== ' ') {
        val = val.replace(newChar, '') + newChar;
        onChange?.(val);
      }
      ref.current.value = val;

    }

  };

  const plHolder = type === 'yellow' ? 'Yellow Letters' : 'Grey Letters';

  return (
    <textarea ref={ref} className={`${styles['letters-box']} ${styles['letters-box-' + type]}`} placeholder={plHolder} name={type} onInput={inputHandle}></textarea>
  );
}
