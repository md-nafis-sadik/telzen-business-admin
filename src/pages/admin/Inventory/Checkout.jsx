import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Input from "@/components/shared/Input";
import MultiSelectInput from "@/components/shared/MultiSelectInput";
import SelectInput from "@/components/shared/SelectInput";
import SliderButton from "@/components/shared/SliderButton";
import RequestLoader from "@/components/shared/RequestLoader";
import CheckoutCard from "@/components/inventory/CheckoutCard";
import AddCustomerModal from "@/components/inventory/AddCustomerModal";
import { images } from "@/services";
import { useCheckout } from "@/hooks";
import CheckoutSkeleton from "./CheckoutSkeleton";

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const {
    step,
    packageData,
    isLoading,
    isError,
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
    selectionType,
    setSelectionType,
    selectedCustomers,
    setSelectedCustomers,
    selectedGroup,
    setSelectedGroup,
    customers,
    groups,
    handleRefetchData,
  } = useCheckout();

  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [cardBrand, setCardBrand] = useState("unknown");

  const [billingData, setBillingData] = useState({
    yourName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const selectionOptions = [
    { label: "Customer", value: "customer" },
    { label: "Group", value: "group" },
  ];

  const handleSelectionTypeChange = (newType) => {
    setSelectionType(newType);
    // Clear selections when switching types
    if (newType === "customer") {
      setSelectedGroup("");
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleCardChange = (event) => {
    if (event.brand) {
      setCardBrand(event.brand);
    }
  };
  const handleAddCustomerSuccess = () => {
    handleRefetchData();
    setShowAddCustomerModal(false);
  };
  const handleCustomerFormSubmit = (e) => {
    e.preventDefault();
    handleCustomerSubmit();
  };

  const handleBillingFormSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!cardholderName.trim()) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    await handlePaymentSubmit({
      cardholderName,
      cardNumberElement,
      stripe,
      elements,
    });
  };

  if (isLoading) {
    return <CheckoutSkeleton />;
  }

  if (isError) {
    return (
      <section className="w-full flex-1 flex flex-col rounded-2xl">
        <div className="bg-white rounded-2xl p-6 flex items-center justify-center min-h-[400px]">
          <p className="text-red-600">
            Failed to load package details. Please try again.
          </p>
        </div>
      </section>
    );
  }

  // Success Step
  if (step === 3) {
    return (
      <section className="w-full flex-1 flex flex-col justify-center rounded-2xl">
        <div className="rounded-2xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <img
                src={images.successful || "/success.png"}
                alt="Success"
                className="w-64 h-64 mx-auto"
              />
            </div>
            <h1 className="text-4xl md:text-[56px] font-[900] font-barlowCondensed text-main-700 mb-4 uppercase">
              Purchase Successful!
            </h1>
            <p className="text-text-700 mb-6">
              eSIM can be usable now also sent on given emails.
            </p>
            <button
              onClick={handleBackToInventory}
              className="px-8 py-3 bg-main-700 text-white rounded-full hover:bg-main-600 w-[244px] transition-colors font-semibold"
            >
              My eSIM
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex-1 flex flex-col rounded-2xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Forms */}
        <div className="w-full bg-white rounded-3xl px-6 py-8 h-max">
          {(step === 1 || step === 2) && (
            // Customer Information Form
            <>
              <h2 className="text-[32px] font-[900] font-barlowCondensed">
                CUSTOMER INFORMATION
              </h2>
              <p className="text-text-700 mb-6 text-base">
                You can add single or multiple Users
              </p>

              <form onSubmit={handleCustomerFormSubmit} className="space-y-6">
                {/* Selection Type Toggle */}
                <div className="flex flex-col gap-3">
                  <SliderButton
                    value={selectionType}
                    onChange={handleSelectionTypeChange}
                    options={selectionOptions}
                  />
                </div>

                {/* Customer Selection */}
                {selectionType === "customer" && (
                  <MultiSelectInput
                    label="Select Customer"
                    placeholder="Select Users"
                    name="selectUser"
                    value={selectedCustomers}
                    onChange={setSelectedCustomers}
                    data={customers}
                    labelKey="label"
                    selector="value"
                    chips={true}
                  />
                )}

                {/* Group Selection */}
                {selectionType === "group" && (
                  <SelectInput
                    label="Select Customer in group"
                    placeholder="Select group"
                    name="selectGroup"
                    value={selectedGroup}
                    onValueChange={setSelectedGroup}
                    data={groups}
                    labelKey="label"
                    selector="value"
                  />
                )}

                {/* Add New Customer Button */}
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(true)}
                  className="flex items-center gap-2 cursor-pointer w-max"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="text-main-700 font-bold">
                    Add New Customer
                  </span>
                </button>

                {step === 1 && (
                  <div className="flex w-full gap-3 border-t border-natural-200 pt-6">
                    <button
                      type="button"
                      onClick={handleBackToInventory}
                      className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-medium w-full"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-main-700 text-white rounded-full hover:bg-main-600 transition-colors font-medium w-full"
                    >
                      Next
                    </button>
                  </div>
                )}
              </form>
            </>
          )}{" "}
          {step === 2 && (
            // Billing Form
            <>
              <h2 className="text-[32px] font-[900] font-barlowCondensed mb-2 mt-7 pt-3.5 border-t border-natural-200">
                BILLING
              </h2>

              <form onSubmit={handleBillingFormSubmit} className="space-y-6">
                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="Enter your Name"
                    className="w-full px-3 md:px-4 placeholder:text-sm md:placeholder:text-base py-2.5 md:py-3.5 border border-gray-300 rounded-lg focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Card Number with Brand Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative border border-gray-300 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 pr-16 focus-within:border-main-500 transition-colors">
                    <CardNumberElement
                      options={{
                        placeholder: "0000 0000 0000 0000",
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#111827",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            "::placeholder": {
                              color: "#9ca3af",
                            },
                          },
                          invalid: {
                            color: "#ef4444",
                          },
                        },
                      }}
                      onChange={handleCardChange}
                    />
                  </div>
                </div>

                {/* Expiration Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiration Date
                    </label>
                    <div className="border border-gray-300 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 focus-within:border-main-500 transition-colors">
                      <CardExpiryElement
                        options={{
                          placeholder: "MM/YY",
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#111827",
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                              "::placeholder": {
                                color: "#9ca3af",
                              },
                            },
                            invalid: {
                              color: "#ef4444",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV/CVC
                    </label>
                    <div className="border border-gray-300 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 focus-within:border-main-500 transition-colors">
                      <CardCvcElement
                        options={{
                          placeholder: "000",
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#111827",
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                              "::placeholder": {
                                color: "#9ca3af",
                              },
                            },
                            invalid: {
                              color: "#ef4444",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !stripe || !cardholderName.trim()}
                  className="w-full px-6 py-3 bg-main-700 text-white rounded-full hover:bg-main-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Right Side - Package Summary */}
        <div className="w-full">
          <CheckoutCard
            packageData={packageData}
            quantity={quantity}
            setQuantity={setQuantity}
            getCoverageText={getCoverageText}
            formatDataSize={formatDataSize}
            subtotal={subtotal}
            grandTotal={grandTotal}
          />
        </div>
      </div>

      {isProcessing && <RequestLoader />}

      {/* Add Customer Modal */}
      <AddCustomerModal
        showModal={showAddCustomerModal}
        onClose={() => setShowAddCustomerModal(false)}
        onSuccess={handleAddCustomerSuccess}
      />
    </section>
  );
}

export default Checkout;
