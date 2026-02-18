import { useCreateCustomerMutation } from "@/features/inventory/customerApi";
import { useGetGroupsQuery } from "@/features/inventory/customerApi";
import { errorNotify, successNotify } from "@/services";
import { useState } from "react";

export const useAddCustomer = ({ onSuccess, onClose }) => {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const { data: groupsData } = useGetGroupsQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: null,
    group: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (country) => {
    setFormData((prev) => ({ ...prev, country }));
  };

  const handleGroupChange = (value) => {
    setFormData((prev) => ({ ...prev, group: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      name: formData.name,
      email: formData.email,
      country: {
        code: formData.country?.code?.toUpperCase() || "BD",
        name: formData.country?.name || "Bangladesh",
      },
    };

    // Only add group if provided
    if (formData.group) {
      customerData.group = formData.group;
    }

    try {
      const result = await createCustomer(customerData).unwrap();
      if (result.success) {
        // Reset form
        setFormData({ name: "", email: "", country: null, group: "" });
        if (onSuccess) {
          onSuccess();
        }
        successNotify(result.message || "Customer created successfully!");
      }
    } catch (error) {
      console.error("Failed to create customer:", error);
      const errorMsg =
        error?.data?.message || error?.error?.data?.message || "Failed to create customer";
      errorNotify(errorMsg);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", country: null, group: "" });
    onClose();
  };

  return {
    isCustomerAddLoading: isLoading,
    formData,
    groups: groupsData?.data || [],
    handleInputChange,
    handleCountryChange,
    handleGroupChange,
    handleSubmit,
    handleClose,
  };
};
