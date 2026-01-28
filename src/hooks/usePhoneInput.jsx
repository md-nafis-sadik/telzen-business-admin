import { useState } from "react";

export const usePhoneInput = (initialValue = "", initialCountry = "bd") => {
  const [phone, setPhone] = useState(initialValue);
  const [countryInfo, setCountryInfo] = useState({
    countryCode: initialCountry,
    dialCode: "",
    name: "",
  });

  const handlePhoneChange = (value, data) => {
    setPhone(value);
    setCountryInfo({
      code: data.countryCode,
      dial_code: data.dialCode,
      name: data.name,
    });
  };

  const resetPhone = () => {
    setPhone("");
    setCountryInfo({
      countryCode: initialCountry,
      dialCode: "",
      name: "",
    });
  };

  return {
    phone,
    countryInfo,
    handlePhoneChange,
    setPhone,
    setCountryInfo,
    resetPhone,
  };
};
