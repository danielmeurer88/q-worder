import { createContext } from "react";
import type { Rule } from "./rules";

export type WordsStateContext = {
  green: string;
  yellows: string;
  greys: string;
  rules: Rule[];
};

export const WordsStateContext = createContext<WordsStateContext | undefined>(void 0);

