export const idGenerator = () =>
  '_' +
  Math.random()
    .toString(36)
    .substr(2, 9);

export const colorGenerator = () =>
  `#${Math.random()
    .toString(16)
    .slice(2, 8)}`;
