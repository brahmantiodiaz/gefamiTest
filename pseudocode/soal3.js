module.exports = function (x) {
  let result = "";
  for (let i = 1; i <= x; i++) {
    result += '* '.repeat(i).trim() + '\n';
  }
  return result.trim();
};
