import { useState } from "react";
import Input from "@/components/shared/Input";
import SelectInput from "@/components/shared/SelectInput";
import RequestLoader from "@/components/shared/RequestLoader";
import CheckoutCard from "@/components/inventory/CheckoutCard";
import { images } from "@/services";
import { useCheckout } from "@/hooks";

function Checkout() {
  const {
    step,
    packageData,
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
  } = useCheckout();

  const [customerData, setCustomerData] = useState({
    selectUser: "",
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
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerFormSubmit = (e) => {
    e.preventDefault();
    handleCustomerSubmit(customerData);
  };

  const handleBillingFormSubmit = (e) => {
    e.preventDefault();
    handlePaymentSubmit(billingData);
  };

  if (isLoading) {
    return (
      <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">
        <div className="bg-white rounded-2xl p-6 flex items-center justify-center min-h-[400px]">
          <RequestLoader />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">
        <div className="bg-white rounded-2xl p-6 flex items-center justify-center min-h-[400px]">
          <p className="text-red-600">Failed to load package details. Please try again.</p>
        </div>
      </section>
    );
  }

  // Success Step
  if (step === 3) {
    return (
      <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">
        <div className="bg-white rounded-2xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <img
                src={images.successful || "/success.png"}
                alt="Success"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-main-700 mb-4 uppercase">
              Purchase Successful!
            </h1>
            <p className="text-text-700 mb-8">
              eSIM can be usable now also sent on given emails.
            </p>
            <button
              onClick={handleBackToInventory}
              className="px-8 py-3 bg-main-700 text-white rounded-lg hover:bg-main-800 transition-colors font-semibold"
            >
              My eSIM
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Forms */}
        <div className="w-full bg-white rounded-3xl px-6 py-8 h-max">
          {step === 1 ? (
            // Customer Information Form
            <>
              <h2 className="text-[32px] font-[900] font-barlowCondensed">CUSTOMER INFORMATION</h2>
              <p className="text-text-700 mb-6 text-base">
                You can add single or multiple Users
              </p>

              <form onSubmit={handleCustomerFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectInput
                    label="Select Customer"
                    placeholder="Select Users"
                    name="selectUser"
                    value={customerData.selectUser}
                    onValueChange={(value) =>
                      setCustomerData((prev) => ({ ...prev, selectUser: value }))
                    }
                    data={[]}
                    labelKey="label"
                    selector="value"
                  />

                  <SelectInput
                    label="Select Customer in group"
                    placeholder="Select group"
                    name="selectGroup"
                    value={customerData.selectGroup}
                    onValueChange={(value) =>
                      setCustomerData((prev) => ({ ...prev, selectGroup: value }))
                    }
                    data={[]}
                    labelKey="label"
                    selector="value"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Customer Name"
                    placeholder="Type name"
                    name="customerName"
                    value={customerData.customerName}
                    onChange={handleCustomerChange}
                    required
                  />

                  <Input
                    label="Email (eSIM will be sent)"
                    placeholder="Type Email"
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleCustomerChange}
                    required
                  />

                  <Input
                    label="Phone Number (Opt)"
                    placeholder="Type phone no"
                    name="phoneNumber"
                    value={customerData.phoneNumber}
                    onChange={handleCustomerChange}
                  />
                </div>

                <div className="flex w-full gap-3 border-t border-natural-400 pt-6">
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
              </form>
            </>
          ) : (
            // Billing Form
            <>
              <h2 className="text-[32px] font-[900] font-barlowCondensed mb-2">CUSTOMER INFORMATION</h2>
              <p className="text-text-700 text-base mb-2 ">
                You can add single or multiple Users
              </p>

              {/* Show selected customer info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Customer Name</p>
                  <p className="font-medium">{selectedCustomer?.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedCustomer?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium">{selectedCustomer?.phoneNumber || "N/A"}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">BILLING</h2>

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
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiration Date"
                    placeholder="MM/YY"
                    name="expirationDate"
                    value={billingData.expirationDate}
                    onChange={handleBillingChange}
                    required
                  />

                  <Input
                    label="CVV/CVC"
                    placeholder="000"
                    name="cvv"
                    value={billingData.cvv}
                    onChange={handleBillingChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-6 py-3 bg-main-700 text-white rounded-lg hover:bg-main-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
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
