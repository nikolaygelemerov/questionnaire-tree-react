export const idGenerator = () =>
  '_' +
  Math.random()
    .toString(36)
    .substr(2, 9);

export const colorGenerator = () =>
  `#${Math.random()
    .toString(16)
    .slice(2, 8)}`;

export const idStringReplace = (string, id) => string.replace('{id}', id);
export const stringReplace = (string, parts) => {
  let newString = string.slice();
  parts.forEach(el => {
    newString = newString.replace(el.key, el.value);
  });
  return newString;
};
