import { checkEmailValidity } from "../common";


const userValidation = (data = {}) => {
  const { name, email, phone, address, about_me } = data || {};
  if (!name) return { error: "Name is required" };
  if (!email) return { error: "Email is required" };
  if (!checkEmailValidity(email)) return { error: "Email is not valid" };
  if (!phone) return { error: "Phone is required" };
  if (phone?.length < 10)
    return { error: "Phone number must be greater than 10 digits" };
  if (!address) return { error: "Address is required" };
  if (!about_me) return { error: "About me is required" };

  return { error: null };
};

const userPasswordValidation = (data = {}) => {
  const { newPassword, confirmPassword } = data || {};
  if (!newPassword) return { error: "New Password is required" };
  if (newPassword?.length < 8)
    return { error: "New Password must be at least 8 characters" };
  if (!confirmPassword) return { error: "Current Password is required" };
  if (newPassword !== confirmPassword)
    return { error: "Password does not match" };
  return { error: null };
};

const userPayoutValidation = (data = {}) => {
  const {
    amount,
    ac_holder_name,
    ac_number,
    confirm_ac_number,
    ac_type,
    bank_name,
    routing_number,
  } = data || {};

  if (!amount) return { error: "Amount is required" };
  if (!ac_holder_name) return { error: "Account Holder Name is required" };
  if (!ac_number) return { error: "Account Number is required" };
  if (!confirm_ac_number)
    return { error: "Confirm Account Number is required" };
  if (ac_number !== confirm_ac_number)
    return { error: "Account Number does not match" };
  if (!ac_type) return { error: "Account Type is required" };
  if (!bank_name) return { error: "Bank Name is required" };
  if (!routing_number) return { error: "Routing Number is required" };

  return { error: null };
};

export { userPasswordValidation, userPayoutValidation, userValidation };
