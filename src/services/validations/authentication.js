import { checkEmailValidity } from "../common";

const loginValidation = (data = {}) => {
  const { email, password } = data || {};
  if (!email) return { error: "Email is required" };
  if (!checkEmailValidity(email)) return { error: "Email is not valid" };
  if (!password) return { error: "Password is required" };
  return { error: null };
};

const registrationValidation = (data = {}) => {
  const { email, password, name, phone, confirmPassword } = data || {};
  if (!name) return { error: "Name is required" };
  if (!email) return { error: "Email is required" };
  if (!checkEmailValidity(email)) return { error: "Email is not valid" };
  if (!phone) return { error: "Phone is required" };
  if (phone.length < 10)
    return { error: "Phone number must be greater than 10 digits" };
  if (!password) return { error: "Password is required" };
  if (password?.length < 8) {
    return { error: "Passwords must be 8 characters or longer." };
  }

  if (!confirmPassword) return { error: "Confirm Password is required" };
  if (confirmPassword?.length < 8) {
    return { error: "Confirm Passwords must be 8 characters or longer." };
  }
  if (password !== confirmPassword) return { error: "Passwords do not match" };
  return { error: null };
};

const otpValidation = (data) => {
  const { email, otp } = data || {};
  if (!email) return { error: "Email is required" };
  if (!checkEmailValidity(email)) return { error: "Email is not valid" };
  if (!otp) return { error: "OTP is required" };
  if (otp?.length !== 6) return { error: "OTP must be 6 digits" };
  return { error: null };
};

export { loginValidation, otpValidation, registrationValidation };
