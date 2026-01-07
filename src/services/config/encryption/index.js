import CryptoJS from "crypto-js";
import { envConfig } from "../env";

const encryptValue = (value) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(
      value,
      envConfig.cryptoSecret
    ).toString();
    return { data: ciphertext, error: null };
  } catch (error) {
    return { data: null, error: "Encryption failed" };
  }
};

const decryptValue = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, envConfig.cryptoSecret);
    const originalValue = bytes.toString(CryptoJS.enc.Utf8);
    return { data: originalValue, error: null };
  } catch (error) {
    return { data: null, error: "Decryption failed" };
  }
};

export { decryptValue, encryptValue };
