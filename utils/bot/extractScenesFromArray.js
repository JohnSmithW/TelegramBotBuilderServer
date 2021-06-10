exports.extractScenesFromArray = array => {
  const iterator = array.values();
  let list = [];

  for (const value of iterator) {
    list.push(value);
  }

  return list;
};
