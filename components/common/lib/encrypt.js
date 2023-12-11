import crypto from "crypto";

const algorithm = process.env.ALGORITHM;
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypter(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

export function encrypt(text) {
  const encrypted = encrypter(text);
  return encrypted.encryptedData;
}
