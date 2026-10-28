

export type Rule = {
  char: string;
  pos: 1 | 2 | 3 | 4 | 5;
  type: 'IS' | 'IS_NOT';
} | {
  char: string;
  type: 'NOT_INCLUDING' | 'MUST_INCLUDE'
};

export function wordFulfillRule(word: string, rule: Rule) {

  switch (rule.type) {
    case 'IS': return rule.char === word[rule.pos - 1];
    case 'IS_NOT': return rule.char !== word[rule.pos - 1];
    case 'MUST_INCLUDE': return word.includes(rule.char);
    case 'NOT_INCLUDING': return !word.includes(rule.char);
    default: return false;
  }

}
