import { useState } from "react";

export const usePhoneInput = (initialValue = "", initialCountry = "bd") => {
  const [phone, setPhone] = useState(initialValue);
  const [country, setCountry] = useState(initialCountry);

  const handlePhoneChange = (value, data) => {
    setPhone(value);
    setCountry(data.countryCode);
  };

  const resetPhone = () => {
    setPhone("");
    setCountry(initialCountry);
  };

  return {
    phone,
    country,
    handlePhoneChange,
    setPhone,
    setCountry,
    resetPhone,
  };
};
