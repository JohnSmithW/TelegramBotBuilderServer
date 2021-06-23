exports.formatData = (variableList, valuesList) => {
  const list = variableList.map((varibale, index) => ({
    name: varibale,
    values: valuesList[index],
  }));

  const formattedList = [];

  list.forEach((listItem, index) => {
    listItem.values.forEach((valuesItem, valuesIndex) => {
      formattedList[valuesIndex] = formattedList[valuesIndex] || {};
      formattedList[valuesIndex][listItem.name] = valuesItem;
    });
  });

  return formattedList;
};
