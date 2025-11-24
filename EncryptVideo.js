const fs = require("fs");
const crypto = require("crypto");

// === READ KEY AND IV FROM FILE ===
const keyFile = fs.readFileSync("encryption_info.txt", "utf-8");

// Extract Base64 values using regex
const keyBase64 = keyFile.match(/AES-256[\s\S]*?([A-Za-z0-9+/=]+)\n/)[1].trim();
const ivBase64 = keyFile.match(/IV[\s\S]*?([A-Za-z0-9+/=]+)$/)[1].trim();

// Convert Base64 → Buffers
const KEY = Buffer.from(keyBase64, "base64");
const IV = Buffer.from(ivBase64, "base64");

// === INPUT / OUTPUT FILES ===
const inputPath = "./nana_election.mp4"; // your original video
const outputPath = "./nana_election.enc"; // encrypted video output

const input = fs.createReadStream(inputPath);
const output = fs.createWriteStream(outputPath);

// AES-256-CBC cipher
const cipher = crypto.createCipheriv("aes-256-cbc", KEY, IV);

// PIPE STREAM: video → encrypt → file
input.pipe(cipher).pipe(output);

output.on("finish", () => {
  console.log("✔ Video successfully encrypted.");
  console.log("Encrypted file: video.enc");
});
