const getKeyByValue = (obj: { [key: string | number]: any }, value: any): any => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export default getKeyByValue;
