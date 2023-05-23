export const truncateWithEllipsis = (str: string, maxSize = 10): string => {
  if (str.length <= maxSize) {
    return str;
  }
  return str.substring(0, maxSize - 1).concat('…');
};
