const envConfig = {
  // locations
  baseUrl: import.meta.env.VITE_BASE_URL,
  inventoryBaseUrl: import.meta.env.VITE_INVENTORY_BASE_URL || "https://backend.telzen.net/api/v1/web",

  //Crypto Js
  cryptoSecret: import.meta.env.VITE_CRYPTO_SECRET,
};

export { envConfig };
