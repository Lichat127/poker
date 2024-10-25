export const repeatIn = (array: string[], nb: number): boolean => {
  const dict: { [key: string]: number } = {};

  for (const item of array) {
    dict[item] = (dict[item] || 0) + 1;
    if (dict[item] === nb) {
      return true;
    }
  }

  return false;
};
