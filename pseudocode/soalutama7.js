
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sha256(message) {
    const ROTR = (x, n) => (x >>> n) | (x << (32 - n));
    const MAX_UINT32 = 2 ** 32;

    const isPrime = n => {
        for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
            if (n % i === 0) return false;
        }
        return true;
    };

    const fracToUint32 = n => ((n - Math.floor(n)) * MAX_UINT32) | 0;
    const H = [], K = [];
    for (let i = 2, primesFound = 0; primesFound < 64; i++) {
        if (isPrime(i)) {
            if (primesFound < 8) H.push(fracToUint32(Math.sqrt(i)));
            K.push(fracToUint32(Math.cbrt(i)));
            primesFound++;
        }
    }
    const msgBytes = [];
    for (let i = 0; i < message.length; i++) {
        const code = message.charCodeAt(i);
        if (code > 255) throw new Error("Only ASCII supported");
        msgBytes.push(code);
    }


    msgBytes.push(0x80);
    while ((msgBytes.length % 64) !== 56) msgBytes.push(0x00);
    const bitLen = message.length * 8;
    const lenHi = Math.floor(bitLen / MAX_UINT32);
    const lenLo = bitLen >>> 0;


    for (let i = 3; i >= 0; i--) msgBytes.push((lenHi >>> (i * 8)) & 0xff);
    for (let i = 3; i >= 0; i--) msgBytes.push((lenLo >>> (i * 8)) & 0xff);

    const words = new Uint32Array(msgBytes.length / 4);
    for (let i = 0; i < words.length; i++) {
        words[i] =
            (msgBytes[i * 4] << 24) |
            (msgBytes[i * 4 + 1] << 16) |
            (msgBytes[i * 4 + 2] << 8) |
            (msgBytes[i * 4 + 3]);
    }

    const w = new Uint32Array(64);
    const hash = H.slice();

    for (let i = 0; i < words.length; i += 16) {
        for (let t = 0; t < 16; t++) w[t] = words[i + t];
        for (let t = 16; t < 64; t++) {
            const s0 = ROTR(w[t - 15], 7) ^ ROTR(w[t - 15], 18) ^ (w[t - 15] >>> 3);
            const s1 = ROTR(w[t - 2], 17) ^ ROTR(w[t - 2], 19) ^ (w[t - 2] >>> 10);
            w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
        }

        let [a, b, c, d, e, f, g, h] = hash;

        for (let t = 0; t < 64; t++) {
            const S1 = ROTR(e, 6) ^ ROTR(e, 11) ^ ROTR(e, 25);
            const ch = (e & f) ^ (~e & g);
            const temp1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
            const S0 = ROTR(a, 2) ^ ROTR(a, 13) ^ ROTR(a, 22);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (S0 + maj) >>> 0;

            [a, b, c, d, e, f, g, h] = [
                (temp1 + temp2) >>> 0,
                a, b, c,
                (d + temp1) >>> 0,
                e, f, g
            ];
        }

        hash[0] = (hash[0] + a) >>> 0;
        hash[1] = (hash[1] + b) >>> 0;
        hash[2] = (hash[2] + c) >>> 0;
        hash[3] = (hash[3] + d) >>> 0;
        hash[4] = (hash[4] + e) >>> 0;
        hash[5] = (hash[5] + f) >>> 0;
        hash[6] = (hash[6] + g) >>> 0;
        hash[7] = (hash[7] + h) >>> 0;
    }

    return hash.map(x => x.toString(16).padStart(8, '0')).join('');
}

async function generateHash(inputString) {
    const buffer = new TextEncoder().encode(inputString);
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log("Hash:", hashHex);
}
const firstName = "rudhi";
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const inputString = `${dd}${mm}${yyyy}${firstName}priaifabula`;
generateHash(inputString);
console.log(`hashManual: ${sha256(inputString)}`);

rl.question("Masukan nama depan untuk di hasing : ", function (x) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const inputString = `${dd}${mm}${yyyy}${x}priaifabula`;
    generateHash(inputString);
    console.log(`hashManual: ${sha256(inputString)}`);
    rl.close();
});
