exports.getStartCommand = list => {
  let result = '';
  list.forEach(({ type, values }) => {
    if (type === 'START_COMMAND') {
      result = values.response;
    }
  });

  return result;
};
