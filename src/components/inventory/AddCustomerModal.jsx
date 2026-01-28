import CustomModal from "../shared/CustomModal";
import Input from "../shared/Input";
import PhoneInput from "../shared/PhoneInput";
import { useAddCustomer } from "@/hooks/useAddCustomer";

function AddCustomerModal({ showModal, onClose, onSuccess }) {
  const {
    isCustomerAddLoading,
    handlePhoneChange,
    formData,
    handleInputChange,
    handleSubmit,
    handleClose,
    phone,
  } = useAddCustomer({ onSuccess, onClose });

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

          <PhoneInput
            label="Phone Number (Optional)"
            placeholder="Enter phone number"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            country="bd"
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
              disabled={isCustomerAddLoading}
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
