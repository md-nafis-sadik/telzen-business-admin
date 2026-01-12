import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetSinglePackageQuery } from "@/features/inventory/inventoryApi";
import { successNotify, errorNotify } from "@/services";

export const useCheckout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  
  const country_id = searchParams.get("country_id");
  const region_id = searchParams.get("region_id");
  const package_id = searchParams.get("package_id");

  const [step, setStep] = useState(1); // 1: Customer Info, 2: Billing, 3: Success
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: packageData, isLoading, isError } = useGetSinglePackageQuery({
    country_id,
    region_id,
    package_id,
  });

  const formatDataSize = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const handleCustomerSubmit = (customer) => {
    setSelectedCustomer(customer);
    setStep(2);
  };

  const handleBackToCustomer = () => {
    setStep(1);
  };

  const handlePaymentSubmit = async (paymentData) => {
    setIsProcessing(true);

    try {
      // TODO: Replace with actual API call
      console.log("Processing payment:", {
        customer: selectedCustomer,
        package: packageData?.data,
        quantity,
        payment: paymentData,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      successNotify("Purchase successful!");
      setStep(3);
    } catch (error) {
      errorNotify("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToInventory = () => {
    navigate("/admin/inventory");
  };

  const getCoverageText = () => {
    if (packageData?.data?.country?.name) {
      return packageData.data.country.name;
    }
    if (packageData?.data?.region?.name) {
      return packageData.data.region.name;
    }
    return "N/A";
  };

  const subtotal = packageData?.data?.grand_total_selling_price
    ? packageData.data.grand_total_selling_price * quantity
    : 0;

  const grandTotal = subtotal;

  return {
    step,
    packageData: packageData?.data,
    isLoading,
    isError,
    selectedCustomer,
    quantity,
    setQuantity,
    isProcessing,
    formatDataSize,
    handleCustomerSubmit,
    handleBackToCustomer,
    handlePaymentSubmit,
    handleBackToInventory,
    getCoverageText,
    subtotal,
    grandTotal,
  };
};

export default useCheckout;
