import { createContext } from "react";
import type { Rule } from "./rules";

export type WordsStateContextType = {
  green: string;
  yellows: string;
  greys: string;
  rules: Rule[];
};

export const WordsStateContext = createContext<WordsStateContextType | undefined>(void 0);

