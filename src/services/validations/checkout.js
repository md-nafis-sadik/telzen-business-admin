import { checkEmailValidity } from "../common";

const customerValidation = (data = {}) => {
  const { selectUser } = data || {};
  
  if (!selectUser || selectUser.length === 0) {
    return { error: "Please select at least one customer" };
  }
  
  return { error: null };
};

const addedCustomerValidation = (data = {}) => {
  const { customerName, email } = data || {};
  
  if (!customerName || !customerName.trim()) {
    return { error: "Customer name is required" };
  }
  
  if (!email || !email.trim()) {
    return { error: "Email is required" };
  }
  
  if (!checkEmailValidity(email)) {
    return { error: "Email is not valid" };
  }
  
  return { error: null };
};

const billingValidation = (data = {}) => {
  const { yourName, cardNumber, expirationDate, cvv } = data || {};
  
  if (!yourName || !yourName.trim()) {
    return { error: "Your name is required" };
  }
  
  if (!cardNumber || !cardNumber.trim()) {
    return { error: "Card number is required" };
  }
  
  // Basic card number validation (16 digits)
  const cleanCardNumber = cardNumber.replace(/\s/g, "");
  if (!/^\d{16}$/.test(cleanCardNumber)) {
    return { error: "Card number must be 16 digits" };
  }
  
  if (!expirationDate || !expirationDate.trim()) {
    return { error: "Expiration date is required" };
  }
  
  // Validate MM/YY format
  if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
    return { error: "Expiration date must be in MM/YY format" };
  }
  
  // Validate expiration date is not in the past
  const [month, year] = expirationDate.split("/");
  const expMonth = parseInt(month, 10);
  const expYear = parseInt("20" + year, 10);
  
  if (expMonth < 1 || expMonth > 12) {
    return { error: "Invalid month in expiration date" };
  }
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return { error: "Card has expired" };
  }
  
  if (!cvv || !cvv.trim()) {
    return { error: "CVV is required" };
  }
  
  // CVV validation (3 or 4 digits)
  if (!/^\d{3,4}$/.test(cvv)) {
    return { error: "CVV must be 3 or 4 digits" };
  }
  
  return { error: null };
};

export { customerValidation, addedCustomerValidation, billingValidation };
