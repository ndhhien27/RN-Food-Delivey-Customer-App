/* eslint-disable import/prefer-default-export */
export function currencyFormat(string) {
  return string.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
