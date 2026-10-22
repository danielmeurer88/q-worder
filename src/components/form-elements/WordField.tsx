import { useEffect, useRef, useState } from "react";
import type { InputEvent } from "react";
import styles from './WordField.module.css';

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
    console.log('updateInputFields', {ref, elements});
  };

  const handleInput = (index: number, e: InputEvent<HTMLInputElement>) => {

    let char = (e.nativeEvent.data! || ' ').toLocaleUpperCase();

    if (!/^[A-Z]$/.test(char)) {
      char = ' ';
    }

    const inpEl = getInputElement(index);

    const diff = inpEl.value !== char;

    inpEl.value = char;

    if (diff) {
      let word = chars;
      word[index] = char;
      onChange?.(word.join(''));
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
        />
      ))}
    </div>
  );
}
