import { useCreateCustomerMutation } from "@/features/inventory/customerApi";
import { usePhoneInput } from ".";
import { errorNotify, successNotify } from "@/services";
import { useState } from "react";

export const useAddCustomer = ({ onSuccess, onClose }) => {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const { phone, countryInfo, handlePhoneChange, resetPhone } = usePhoneInput(
    "",
    "bd",
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      name: formData.name,
      email: formData.email,
      country: {
        code: countryInfo.code?.toUpperCase() || "BD",
        name: countryInfo.name || "Bangladesh",
      },
    };

    // Only add phone if provided
    if (phone && phone.trim()) {
      customerData.phone = `+${phone}`;
    }

    try {
      const result = await createCustomer(customerData).unwrap();
      if (result.success) {
        // Reset form
        setFormData({ name: "", email: "" });
        resetPhone();
        if (onSuccess) {
          onSuccess();
        }
        successNotify(result.message || "Customer created successfully!");
      }
    } catch (error) {
      console.error("Failed to create customer:", error);
      const errorMsg =
        error?.error?.data?.message || "Failed to create customer";
      errorNotify(errorMsg);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "" });
    resetPhone();
    onClose();
  };

  return {
    isCustomerAddLoading: isLoading,
    handlePhoneChange,
    formData,
    handleInputChange,
    handleSubmit,
    handleClose,
    phone,
  };
};
