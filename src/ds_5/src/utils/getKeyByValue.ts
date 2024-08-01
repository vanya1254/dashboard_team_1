/**
 * Функция для получения ключа объекта по его значению.
 *
 * @param obj - Объект, в котором происходит поиск ключа.
 * @param value - Значение, по которому ищется ключ.
 * @returns Ключ объекта, соответствующий переданному значению, или undefined, если ключ не найден.
 */
const getKeyByValue = <T extends { [key: string]: any }>(obj: T, value: any): keyof T | undefined => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export default getKeyByValue;
