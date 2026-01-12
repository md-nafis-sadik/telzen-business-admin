import { useState } from "react";
import { successNotify, errorNotify } from "@/services";

export const useContactSupport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      brief: formData.get("brief"),
    };

    // Basic validation
    if (!data.email || !data.subject || !data.brief) {
      errorNotify("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      console.log("Contact Support Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
