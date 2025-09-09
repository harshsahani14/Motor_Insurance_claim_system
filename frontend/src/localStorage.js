export const setLocalItem = (key, value) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + 86400000, 
  };

  localStorage.setItem(key, JSON.stringify(item));
};


export const getLocalItem = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

export const removeLocalItem = (key) => {
  localStorage.removeItem(key);
};

export const clearLocal = () => {
  localStorage.clear();
};
