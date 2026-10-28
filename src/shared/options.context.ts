
import { createContext } from "react";

export type WordsOptionsContextType = {
  useNonSolutions: boolean;
  showWords: boolean;
};

export const WordsOptionsContext = createContext<WordsOptionsContextType>({useNonSolutions: false, showWords: false});
