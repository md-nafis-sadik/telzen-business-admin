import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetSinglePackageQuery } from "@/features/inventory/inventoryApi";
import {
  useGetCustomersQuery,
  useGetGroupsQuery,
  useCreateCheckoutPaymentMutation,
  useCheckoutVerifyPaymentMutation,
} from "@/features/inventory/customerApi";
import {
  successNotify,
  errorNotify,
  customerValidation,
  billingValidation,
} from "@/services";

export const useCheckout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const country_id = searchParams.get("country_id");
  const region_id = searchParams.get("region_id");
  const package_id = searchParams.get("package_id");

  const [step, setStep] = useState(1); // 1: Customer Info, 2: Billing, 3: Success
  const [selectionType, setSelectionType] = useState("customer"); // "customer" or "group"
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // API Queries
  const {
    data: packageData,
    isLoading,
    isError,
  } = useGetSinglePackageQuery({
    country_id,
    region_id,
    package_id,
  });

  const { data: customersData, refetch: refetchCustomers } = useGetCustomersQuery();
  const { data: groupsData, refetch: refetchGroups } = useGetGroupsQuery();

  const [createCheckoutPayment] = useCreateCheckoutPaymentMutation();
  const [verifyCheckoutPayment] = useCheckoutVerifyPaymentMutation();

  const formatDataSize = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const handleRefetchData = () => {
    refetchCustomers();
    refetchGroups();
  };

  const handleCustomerSubmit = () => {
    // Validate selection
    if (selectionType === "customer" && selectedCustomers.length === 0) {
      errorNotify("Please select at least one customer");
      return false;
    }
    if (selectionType === "group" && !selectedGroup) {
      errorNotify("Please select a group");
      return false;
    }
    setStep(2);
    return true;
  };

  const handlePaymentSubmit = async (paymentData) => {
    if (!paymentData.cardholderName?.trim()) {
      errorNotify("Please enter cardholder name");
      return false;
    }

    if (!paymentData.stripe || !paymentData.elements) {
      errorNotify("Payment system not ready. Please try again.");
      return false;
    }

    setIsProcessing(true);

    try {
      // Prepare payment data based on selection type
      const checkoutData = {
        package: package_id,
        final_payment_amount: grandTotal,
        quantity: quantity,
        currency: "USD",
      };

      if (selectionType === "customer") {
        checkoutData.customers = selectedCustomers;
      } else {
        checkoutData.group = selectedGroup;
      }

      console.log('Checkout data being sent:', checkoutData);
      console.log('Selection type:', selectionType);
      console.log('Selected customers:', selectedCustomers);
      console.log('Selected group:', selectedGroup);

      // Create payment
      const paymentResult = await createCheckoutPayment(checkoutData).unwrap();
      
      if (!paymentResult?.success || !paymentResult?.data) {
        throw new Error("Failed to create payment");
      }

      const { client_secret, payment_id } = paymentResult.data;

      if (!client_secret) {
        throw new Error("Payment initialization failed. Please try again.");
      }

      // Confirm card payment with Stripe
      const { error: stripeError, paymentIntent } =
        await paymentData.stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: paymentData.cardNumberElement,
            billing_details: {
              name: paymentData.cardholderName.trim(),
            },
          },
        });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent?.status === "succeeded") {
        // Verify payment with backend
        if (!payment_id) {
          throw new Error("Payment ID not found");
        }

        const verifyResult = await verifyCheckoutPayment({ paymentId: payment_id }).unwrap();
        
        if (verifyResult?.success) {
          setStep(3);
          return true;
        } else {
          throw new Error("Payment verification failed");
        }
      }
    } catch (error) {
      errorNotify(error?.data?.message || error?.message || "Payment failed. Please try again.");
      console.error("Payment error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToInventory = () => {
    navigate("/admin/my-esim");
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

  // Format customers and groups for dropdowns
  const customers = customersData?.data?.map((customer) => ({
    label: `${customer.name} (${customer.email})`,
    value: customer._id,
  })) || [];

  const groups = groupsData?.data?.map((group) => ({
    label: group.name,
    value: group._id,
  })) || [];

  return {
    step,
    packageData: packageData?.data,
    isLoading,
    isError,
    selectionType,
    setSelectionType,
    selectedCustomers,
    setSelectedCustomers,
    selectedGroup,
    setSelectedGroup,
    quantity,
    setQuantity,
    isProcessing,
    formatDataSize,
    handleCustomerSubmit,
    handlePaymentSubmit,
    handleBackToInventory,
    getCoverageText,
    subtotal,
    grandTotal,
    customers,
    groups,
    handleRefetchData,
  };
};

export default useCheckout;
