const readline = require('readline');
const soal1 = require('./soal1');
const soal2 = require('./soal2');
const soal3 = require('./soal3');
const soal4 = require('./soal4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Pilih soal yang ingin dijalankan:");
console.log("1. Deret kelipatan 5 + label");
console.log("2. Deret Fibonacci 20 angka");
console.log("3. Segitiga bintang");
console.log("4. Konversi angka ke huruf (terbilang)");

rl.question("Masukkan nomor soal (1-4): ", function(answer) {
  switch (answer.trim()) {
    case "1":
      soal1();
      break;
    case "2":
      soal2();
      break;
    case "3":
      rl.question("Masukkan nilai x: ", function(x) {
        soal3(parseInt(x));
        rl.close();
      });
      return;
    case "4":
      rl.question("Masukkan angka 4 digit (>2000): ", function(x) {
        soal4(parseInt(x));
        rl.close();
      });
      return;
    default:
      console.log("Pilihan tidak valid.");
  }

  rl.close();
});
