module.exports = function () {
  let result = "";
  for (let i = 50; i <= 100; i += 5) {
    let status = "";

    if (i <= 60) {
      status = "KURANG";
    } else if (i <= 70) {
      status = "CUKUP";
    } else if (i <= 80) {
      status = "BAIK";
    } else {
      status = "LUAR BIASA";
    }

    result += `${i} - ${status}\n`;
  }
  return result.trim();
};