import { useSendSupportMessageMutation } from "@/features/customerSupport/customerSupportApi";
import { errorNotify, successNotify } from "@/services";
import { useState } from "react";

export const useContactSupport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sendSupportMessage, isLoading] = useSendSupportMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Basic validation
    if (!data.email || !data.subject || !data.message) {
      errorNotify("Please fill in all fields");
      return;
    }

    const submittedData = new FormData();
    submittedData.append("data", JSON.stringify(data));

    setIsSubmitting(isLoading);

    try {
      await sendSupportMessage(submittedData).unwrap();

      successNotify("Your message has been sent successfully!");

      // Reset form
      e.target.reset();
    } catch (error) {
      errorNotify("Failed to send message. Please try again.");
      console.error("Error submitting contact support form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
};

export default useContactSupport;
