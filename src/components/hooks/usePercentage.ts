import { useCallback } from 'react';

export const usePercentage = () => {
  /**
   * Get the percentage parts of a value
   *
   * @example get(1, 10%) // [0.1, 0.9]
   * @example get(5, 50%) // [2.5, 2.5]
   * @param {number} value
   * @param {number} percentage
   * @returns [number, number]
   */
  const get = useCallback((value: number, percentage: number) => {
    const part = (value * percentage) / 100;

    return [part, value - part];
  }, []);

  return {
    get,
  };
};
