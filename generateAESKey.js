// generate-key.js
// generate-key.js
const crypto = require("crypto");
const fs = require("fs");

const key = crypto.randomBytes(32); // AES-256 key
const iv = crypto.randomBytes(16); // AES IV

const keyBase64 = key.toString("base64");
const ivBase64 = iv.toString("base64");

const content = `
AES-256 Encryption Key (Base64):
${keyBase64}

Initialization Vector (IV) (Base64):
${ivBase64}
`;

fs.writeFileSync("encryption_info.txt", content.trim());

console.log("✔ encryption_info.txt has been created in the current directory.");
