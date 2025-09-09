
export const saveToLocalStorage = (key,data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
