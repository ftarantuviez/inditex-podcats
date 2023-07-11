export const trimLargeText = (text: string, maxChar = 80) => {
  const substring = text.substring(0, maxChar);

  return maxChar > text.length ? substring : `${text.substring(0, maxChar)}...`;
};
