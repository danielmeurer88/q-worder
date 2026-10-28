import { useEffect, useRef, useState } from "react";
import type { InputEvent } from "react";
import styles from './WordField.module.css';
import { getCharFromInputData } from "../../shared/functions";

interface WordFieldProps {
  onChange?: (word: string) => void;
  value?: string;
}

export function WordField({ onChange, value = "     " }: WordFieldProps) {

  const [chars, setChars] = useState<string[]>(value.split('').slice(0, 5));

  const ref = useRef<HTMLDivElement>(null);

  const updateInputElements = () => {
    const host = ref.current!;
    const elements = (Array.from(host.children) as HTMLInputElement[]);
    elements?.forEach((el, i) => {
      el.value = chars[i];
    });
  };

  const handleInput = (index: number, e: InputEvent<HTMLInputElement>) => {

    let newChar = getCharFromInputData(e);

    // if data of input event is null then del or back space or cut was used
    const delChar = e.nativeEvent.data === null;

    const diff = chars[index] !== newChar;

    const inpEl = getInputElement(index);

    inpEl.value = newChar;

    if (diff) {
      let word = chars;
      word[index] = newChar;
      setChars(word);
      onChange?.(word.join(''));
    }

    // focus next or previous input
    if (delChar && index > 0) {
      const prevInp = getInputElement(index - 1);
      prevInp?.focus();
    }

    if (!delChar && newChar !== ' ' && index < 4) {
      const nextInp = getInputElement(index + 1);
      nextInp?.focus();
    }

  };

  const getInputElement = (i: number) => {
    const host = ref.current!;
    const elements = (Array.from(host.children) as HTMLInputElement[]);
    return elements[i];
  };

  useEffect(() => {
    // on mount only: write the beginning word to the field
    updateInputElements();
  }, []);



  return (
    <div ref={ref} className={styles['input-field']}>
      {chars.map((char, i) => (
        <input
          key={i}
          className={`${styles.letter} letter-${i + 1}`}
          onInput={(e) => handleInput(i, e)}
          name={`letter-${i + 1}`}
        />
      ))}
    </div>
  );
}
