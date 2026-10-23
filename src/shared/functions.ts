

export function getCharFromInputData(data: string) {

  let newChar = (data! || ' ').toLocaleUpperCase();
  if (!/^[A-Z]$/.test(newChar)) {
    newChar = ' ';
  }
  return newChar;

}

export function cleanTextFromLowerCaseText(text: string) {
  const [min, max] = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];
  return text.split('').filter(c => c.charCodeAt(0) >= min && c.charCodeAt(0) <= max).join('');
}
