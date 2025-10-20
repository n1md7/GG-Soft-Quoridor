const isCrazyApi = (): boolean => {
  try {
    return window.CrazyGames.SDK.sdk.data !== undefined;
  } catch {
    return false;
  }
};

export const getItem = (key: string) => {
  if (isCrazyApi()) {
    return window.CrazyGames.SDK.sdk.data.getItem(key);
  }

  return localStorage.getItem(key);
};

export const setItem = (key: string, value: string) => {
  if (isCrazyApi()) {
    return window.CrazyGames.SDK.sdk.data.setItem(key, value);
  }

  return localStorage.setItem(key, value);
};

export const removeItem = (key: string) => {
  if (isCrazyApi()) {
    return window.CrazyGames.SDK.sdk.data.removeItem(key);
  }

  return localStorage.removeItem(key);
};

export const clear = () => {
  if (isCrazyApi()) {
    return window.CrazyGames.SDK.sdk.data.clear();
  }

  return localStorage.clear();
};
