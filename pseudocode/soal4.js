const angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan"];

function terbilang(num) {
  if (num < 2000 || num > 9999) return "Angka harus 4 digit dan lebih dari 2000";

  let ribu = Math.floor(num / 1000);
  let ratus = Math.floor((num % 1000) / 100);
  let puluh = Math.floor((num % 100) / 10);
  let satuan = num % 10;

  let result = `${angka[ribu]} Ribu`;

  if (ratus > 0) result += ` ${angka[ratus]} Ratus`;

  if (puluh > 0) {
    if (puluh === 1) {
      if (satuan === 0) result += ` Sepuluh`;
      else if (satuan === 1) result += ` Sebelas`;
      else result += ` ${angka[satuan]} Belas`;
      satuan = 0;
    } else {
      result += ` ${angka[puluh]} Puluh`;
    }
  }

  if (satuan > 0) result += ` ${angka[satuan]}`;

  return result.trim();
}

module.exports = terbilang;
