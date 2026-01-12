import { useState } from "react";
import { successNotify, errorNotify } from "@/services";

export const useApiSettings = () => {
  const [apiKeys, setApiKeys] = useState({
    accessCode: "",
    secretKey: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasKeys, setHasKeys] = useState(false);

  const maskKey = (key) => {
    if (!key) return "****";
    const visiblePart = key.slice(-3);
    return `${"*".repeat(12)}${visiblePart}`;
  };

  const handleCopy = async (value, fieldName) => {
    if (!value) {
      errorNotify("No key to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      successNotify(`${fieldName} copied to clipboard!`);
    } catch (error) {
      errorNotify("Failed to copy to clipboard");
      console.error("Copy error:", error);
    }
  };

  const handleGenerateApi = async () => {
    setIsGenerating(true);

    try {
      // TODO: Replace with actual API call
      console.log("Generating API keys...");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock generated keys
      const mockKeys = {
        accessCode: `c${"*".repeat(12)}1ae`,
        secretKey: `c${"*".repeat(12)}1ae`,
      };

      setApiKeys(mockKeys);
      setHasKeys(true);
      successNotify("API keys generated successfully!");
    } catch (error) {
      errorNotify("Failed to generate API keys. Please try again.");
      console.error("Error generating API keys:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRevokeApiKeys = async () => {
    if (
      !window.confirm(
        "Are you sure you want to revoke these API keys? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsGenerating(true);

    try {
      // TODO: Replace with actual API call
      console.log("Revoking API keys...");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setApiKeys({
        accessCode: "",
        secretKey: "",
      });
      setHasKeys(false);
      successNotify("API keys revoked successfully!");
    } catch (error) {
      errorNotify("Failed to revoke API keys. Please try again.");
      console.error("Error revoking API keys:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    apiKeys,
    hasKeys,
    isGenerating,
    maskKey,
    handleCopy,
    handleGenerateApi,
    handleRevokeApiKeys,
  };
};

export default useApiSettings;
