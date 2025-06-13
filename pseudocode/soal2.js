module.exports = function () {
  let a = 0, b = 1;
  const result = [a, b];

  for (let i = 2; i < 20; i++) {
    let next = a + b;
    result.push(next);
    a = b;
    b = next;
  }

  return result.join(' ');
};

 function Fibonacci() {
  let a = 0, b = 1;
  const result = [a, b];

  for (let i = 2; i < 20; i++) {
    let next = a + b;
    result.push(next);
    a = b;
    b = next;
  }
  console.log(result.join(' '));
  return result.join(' ');
};
