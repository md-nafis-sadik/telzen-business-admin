import CustomModal from "../shared/CustomModal";
import Input from "../shared/Input";
import CountrySelect from "../shared/CountrySelect";
import { useAddCustomer } from "@/hooks/useAddCustomer";
import { allCountries } from "@/services";

function AddCustomerModal({ showModal, onClose, onSuccess }) {
  const {
    isCustomerAddLoading,
    formData,
    handleInputChange,
    handleCountryChange,
    handleSubmit,
    handleClose,
  } = useAddCustomer({ onSuccess, onClose });

  const formattedCountries = allCountries;

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.country !== null
    );
  };

  return (
    <CustomModal
      showModal={showModal}
      onClose={handleClose}
      widthClass="w-full sm:w-[600px]"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-[900] font-barlowCondensed uppercase">
          Add New Customer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Customer Name"
            placeholder="Enter customer name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <Input
            label="Email (eSIM will be sent)"
            placeholder="Enter email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <CountrySelect
            label="Customer Country"
            placeholder="Select country"
            options={formattedCountries}
            value={formData.country}
            onChange={handleCountryChange}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isCustomerAddLoading}
              className="w-full px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCustomerAddLoading || !isFormValid()}
              className="w-full px-6 py-3 bg-main-700 text-white rounded-full hover:bg-main-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isCustomerAddLoading ? "Adding..." : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
}

export default AddCustomerModal;
