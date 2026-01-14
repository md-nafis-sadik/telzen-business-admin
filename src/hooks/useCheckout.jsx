import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetSinglePackageQuery } from "@/features/inventory/inventoryApi";
import {
  successNotify,
  errorNotify,
  customerValidation,
  addedCustomerValidation,
  billingValidation,
} from "@/services";

// Mock data for testing
const MOCK_USERS = [
  { id: "user1", label: "John Doe", value: "user1" },
  { id: "user2", label: "Jane Smith", value: "user2" },
  { id: "user3", label: "Bob Johnson", value: "user3" },
  { id: "user4", label: "Alice Williams", value: "user4" },
  { id: "user5", label: "Charlie Brown", value: "user5" },
];

const MOCK_GROUPS = [
  { id: "group1", label: "Sales Team", value: "group1" },
  { id: "group2", label: "Marketing Team", value: "group2" },
  { id: "group3", label: "Development Team", value: "group3" },
  { id: "group4", label: "Support Team", value: "group4" },
];

export const useCheckout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const country_id = searchParams.get("country_id");
  const region_id = searchParams.get("region_id");
  const package_id = searchParams.get("package_id");

  const [step, setStep] = useState(1); // 1: Customer Info, 2: Billing, 3: Success
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [addedCustomers, setAddedCustomers] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const {
    data: packageData,
    isLoading,
    isError,
  } = useGetSinglePackageQuery({
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

  const handleAddCustomer = (customerDetails) => {
    // Validate only if fields are filled
    if (customerDetails.customerName || customerDetails.email) {
      const validation = addedCustomerValidation(customerDetails);
      if (validation.error) {
        errorNotify(validation.error);
        return false;
      }
    }

    // Add to list if at least name and email are provided
    if (customerDetails.customerName && customerDetails.email) {
      setAddedCustomers((prev) => [...prev, customerDetails]);
      successNotify("Customer added successfully!");
      return true;
    }

    return false;
  };

  const handleCustomerSubmit = (customer) => {
    const validation = customerValidation(customer);
    if (validation.error) {
      errorNotify(validation.error);
      return false;
    }
    setSelectedCustomer({ ...customer, addedCustomers });
    setStep(2);
    return true;
  };

  const handlePaymentSubmit = async (paymentData) => {
    const validation = billingValidation(paymentData);
    if (validation.error) {
      errorNotify(validation.error);
      return false;
    }

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
      return true;
    } catch (error) {
      errorNotify("Payment failed. Please try again.");
      console.error("Payment error:", error);
      return false;
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
    addedCustomers,
    quantity,
    setQuantity,
    isProcessing,
    formatDataSize,
    handleAddCustomer,
    handleCustomerSubmit,
    handlePaymentSubmit,
    handleBackToInventory,
    getCoverageText,
    subtotal,
    grandTotal,
    setIsAdded,
    isAdded,
    mockUsers: MOCK_USERS,
    mockGroups: MOCK_GROUPS,
  };
};

export default useCheckout;
