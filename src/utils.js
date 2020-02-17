export const setupEnum = (items) => {
  return (item) => {
    if (items.includes(item)) {
      return item;
    }
    throw new Error(`${item} is not defined`)
  }
};