import { useState } from "react";
import Input from "@/components/shared/Input";
import MultiSelectInput from "@/components/shared/MultiSelectInput";
import RequestLoader from "@/components/shared/RequestLoader";
import CheckoutCard from "@/components/inventory/CheckoutCard";
import { images } from "@/services";
import { useCheckout } from "@/hooks";
import SelectInput from "@/components/shared/SelectInput";

function Checkout() {
  const {
    step,
    packageData,
    isLoading,
    isError,
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
    addedCustomers,
    mockUsers,
    mockGroups,
  } = useCheckout();

  const [customerData, setCustomerData] = useState({
    selectUser: [],
    selectGroup: "",
    customerName: "",
    email: "",
    phoneNumber: "",
  });

  const [billingData, setBillingData] = useState({
    yourName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "");
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setBillingData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    // Format expiration date as MM/YY
    if (name === "expirationDate") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 2) {
        const formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
        setBillingData((prev) => ({ ...prev, [name]: formatted }));
      } else {
        setBillingData((prev) => ({ ...prev, [name]: cleaned }));
      }
      return;
    }

    // Only allow digits for CVV
    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      setBillingData((prev) => ({ ...prev, [name]: cleaned }));
      return;
    }

    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerFormSubmit = (e) => {
    e.preventDefault();
    // Go to billing
    handleCustomerSubmit(customerData);
  };

  const handleAddCustomerClick = () => {
    if (!isAdded) {
      setIsAdded(true);
      return;
    }

    // Add customer to list
    const added = handleAddCustomer({
      selectGroup: customerData.selectGroup,
      customerName: customerData.customerName,
      email: customerData.email,
      phoneNumber: customerData.phoneNumber,
    });

    if (added) {
      // Reset the add customer fields
      setCustomerData((prev) => ({
        ...prev,
        selectGroup: "",
        customerName: "",
        email: "",
        phoneNumber: "",
      }));
    }
  };

  const handleBillingFormSubmit = (e) => {
    e.preventDefault();
    handlePaymentSubmit(billingData);
  };

  if (isLoading) {
    return (
      <section className="w-full flex-1 flex flex-col rounded-2xl">
        <div className="bg-white rounded-2xl p-6 flex items-center justify-center min-h-[400px]">
          <RequestLoader />
        </div>
      </section>
    );
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
                <div
                  className={`grid grid-cols-1 gap-4 ${
                    isAdded ? "md:grid-cols-2" : ""
                  }`}
                >
                  <MultiSelectInput
                    label="Select Customer"
                    placeholder="Select Users"
                    name="selectUser"
                    value={customerData.selectUser}
                    onChange={(value) =>
                      setCustomerData((prev) => ({
                        ...prev,
                        selectUser: value,
                      }))
                    }
                    data={mockUsers}
                    labelKey="label"
                    selector="value"
                    chips={true}
                  />
                  {isAdded && (
                    <SelectInput
                      label="Select Customer in group"
                      placeholder="Select group"
                      name="selectGroup"
                      value={customerData.selectGroup}
                      onValueChange={(value) =>
                        setCustomerData((prev) => ({
                          ...prev,
                          selectGroup: value,
                        }))
                      }
                      data={mockGroups}
                      labelKey="label"
                      selector="value"
                    />
                  )}
                </div>
                {isAdded && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <Input
                        label="Customer Name"
                        placeholder="Type name"
                        name="customerName"
                        value={customerData.customerName}
                        onChange={handleCustomerChange}
                      />

                      <Input
                        label="Email (eSIM will be sent)"
                        labelClass="truncate"
                        placeholder="Type Email"
                        type="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleCustomerChange}
                      />

                      <Input
                        label="Phone Number (Opt)"
                        placeholder="Type phone no"
                        name="phoneNumber"
                        value={customerData.phoneNumber}
                        onChange={handleCustomerChange}
                      />
                    </div>

                    {!isAdded && (
                      <button
                        type="button"
                        onClick={handleAddCustomerClick}
                        className="flex items-center gap-2 px-4 py-2 bg-main-50 text-main-700 rounded-lg hover:bg-main-100 transition-colors font-medium w-max"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                            fill="currentColor"
                          />
                        </svg>
                        Add to List ({addedCustomers.length})
                      </button>
                    )}
                  </>
                )}

                {!isAdded && (
                  <button
                    type="button"
                    onClick={handleAddCustomerClick}
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
                )}

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
                <Input
                  label="Your Name"
                  placeholder="Enter your Name"
                  name="yourName"
                  value={billingData.yourName}
                  onChange={handleBillingChange}
                  required
                />

                <Input
                  label="Card Number"
                  placeholder="0000 0000 0000 0000"
                  name="cardNumber"
                  value={billingData.cardNumber}
                  onChange={handleBillingChange}
                  maxLength={19}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiration Date"
                    placeholder="MM/YY"
                    name="expirationDate"
                    value={billingData.expirationDate}
                    onChange={handleBillingChange}
                    maxLength={5}
                    required
                  />

                  <Input
                    label="CVV/CVC"
                    placeholder="000"
                    name="cvv"
                    value={billingData.cvv}
                    onChange={handleBillingChange}
                    maxLength={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
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
    </section>
  );
}

export default Checkout;
