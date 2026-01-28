const envConfig = {
  // locations
  baseUrl: import.meta.env.VITE_BASE_URL,
  inventoryBaseUrl: import.meta.env.VITE_INVENTORY_BASE_URL || "https://backend.telzen.net/api/v1/web",

  //Crypto Js
  cryptoSecret: import.meta.env.VITE_CRYPTO_SECRET,
  
  // Stripe
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
};

export { envConfig };
