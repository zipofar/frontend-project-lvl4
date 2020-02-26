const setupEnum = (items) => (
  (item) => {
    if (items.includes(item)) {
      return item;
    }
    throw new Error(`Enum ${item} is not defined`);
  }
);

export default {
  setupEnum,
};
