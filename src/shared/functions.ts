import { SCRIPT_CONTENT } from "./grid-games-list";
import { type InputEvent } from "react";

export type Words = {
  allowed: Set<string>;
  solutions: Set<string>;
};

export function getCharFromInputData(e: InputEvent<HTMLElement>) {

  // inputType: "deleteContentForward"

  let newChar = (e.nativeEvent.data! || ' ').toLocaleUpperCase();

  if (!e.nativeEvent.inputType.includes('delete')) {

    if (!/^[A-Z]$/.test(newChar)) {
      newChar = ' ';
    }

  } else {
    newChar = '';
  }

  return newChar;

}

export function cleanTextFromLowerCaseText(text: string) {
  const [min, max] = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];
  return text.split('').filter(c => c.charCodeAt(0) >= min && c.charCodeAt(0) <= max).join('');
}

export function getWords(): Words {

  const words = {
    allowed: new Set<string>(),
    solutions: new Set<string>()
  };

  const scriptContent = SCRIPT_CONTENT;

  const allowListStartI = scriptContent.indexOf('[');
  const allowListEndI = scriptContent.indexOf(']');
  const allowListString = scriptContent.substring(allowListStartI, allowListEndI) + ']';

  const allowList = JSON.parse(allowListString);

  const solutionsStartI = scriptContent.indexOf('[', allowListEndI + 1);
  const solutionsEndI = scriptContent.indexOf(']', allowListEndI + 1);

  const solutionsString = scriptContent.substring(solutionsStartI, solutionsEndI) + ']';

  const solutions = JSON.parse(solutionsString);


  words.allowed.clear();
  words.solutions.clear();

  if (Array.isArray(solutions)) {
    solutions.sort();
    solutions.forEach(word => {
      words.solutions.add(word);
    });
  }

  if (Array.isArray(allowList)) {
    allowList.sort();
    allowList.forEach(word => {
      if (!words.solutions.has(word)) {
        words.allowed.add(word);
      }
    });
  }

  return words;

}
