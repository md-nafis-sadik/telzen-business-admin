import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/shared/Input";
import CountrySelect from "@/components/shared/CountrySelect";
import SelectInput from "@/components/shared/SelectInput";
import { useAddCustomer } from "@/hooks/useAddCustomer";
import { adminRouteLinks, allCountries } from "@/services";
import UsersSuccessModal from "@/components/users/UsersSuccessModal";

function AddCustomer() {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSuccess = () => {
    navigate(adminRouteLinks.usersActive.path);
  };

  const handleClose = () => {
    navigate(adminRouteLinks.usersActive.path);
  };

  const {
    isCustomerAddLoading,
    formData,
    groups,
    handleInputChange,
    handleCountryChange,
    handleGroupChange,
    handleSubmit,
  } = useAddCustomer({ onSuccess: handleSuccess, onClose: handleClose });

  const groupOptions = groups.map((group) => ({
    name: group.name || group.group_name,
    id: group._id,
    timestamp: group.name || group.group_name,
  }));

  const formattedCountries = allCountries;

  // Check if form is valid to enable submit button
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.country !== null &&
      agreedToTerms
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-6">
      {/* Main Content Card */}
      <div className="w-full bg-white rounded-3xl px-6 py-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-[32px] font-[900] font-barlowCondensed">
              ADD A CUSTOMER
            </h2>
            <p className="text-text-700 text-base">
              Few simple steps to add customers
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Customer Name"
                placeholder="Type Customer Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Customer Email"
                placeholder="Type customer email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CountrySelect
                label="Customer Country"
                placeholder="Select country"
                options={formattedCountries}
                value={formData.country}
                onChange={handleCountryChange}
              />

              <SelectInput
                label="Customer Group (Optional)"
                placeHolder="Select group"
                data={groupOptions}
                value={formData.group}
                onValueChange={handleGroupChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                id="terms-checkbox"
                className="mt-1 w-4 h-4 text-main-700 border-gray-300 rounded focus:ring-main-700"
              />
              <label htmlFor="terms-checkbox" className="text-sm">
                By creating an account, you agree to our{" "}
                <span className="text-main-700 cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-main-700 cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            <div className="flex gap-4 max-w-[548px]">
              <button
                type="button"
                onClick={handleClose}
                disabled={isCustomerAddLoading}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isCustomerAddLoading || !isFormValid()}
                className="flex-1 px-6 py-3 bg-main-700 text-white rounded-full hover:bg-main-600 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCustomerAddLoading ? "Adding..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <UsersSuccessModal />
    </div>
  );
}

export default AddCustomer;
