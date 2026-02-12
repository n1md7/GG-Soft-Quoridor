export const upto = (max: number) => Math.random() * max;

export const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomItem = <T>(array: T[]): T => {
  if (!array) return array;

  const size = array.length;
  const index = randInt(0, size);

  return array[index];
};
