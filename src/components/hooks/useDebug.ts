export const useDebug = () => {
  return {
    hidden: location.hash !== '#debug',
  };
};
