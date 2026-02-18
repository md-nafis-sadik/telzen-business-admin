import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/shared/Input";
import { useCreateGroupMutation } from "@/features/users/usersApi";
import { useGetActiveRegularUsersQuery } from "@/features/users/usersApi";
import { errorNotify, successNotify, adminRouteLinks } from "@/services";
import { X } from "lucide-react";
import SelectInput from "@/components/shared/SelectInput";

function AddGroup() {
  const navigate = useNavigate();
  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const { data: customersData, isLoading: isLoadingCustomers } = useGetActiveRegularUsersQuery({
    current_page: 1,
    limit: 9999999,
    search: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    selectedCustomers: [],
  });

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [tempSelection, setTempSelection] = useState("");

  const customers = customersData?.data || [];

  const availableCustomers = customers.filter(
    (customer) => !selectedCustomerIds.includes(customer._id)
  );

  const customerOptions = availableCustomers.map((customer) => ({
    id: customer._id,
    timestamp: customer.name || customer.full_name || customer.email,
    email: customer.email,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerSelect = (customerId) => {
    if (customerId && !selectedCustomerIds.includes(customerId)) {
      const customer = customers.find((c) => c._id === customerId);
      if (customer) {
        setSelectedCustomerIds((prev) => [...prev, customerId]);
        setFormData((prev) => ({
          ...prev,
          selectedCustomers: [...prev.selectedCustomers, customer],
        }));
        setTempSelection("");
      }
    }
  };

  const handleRemoveCustomer = (customerId) => {
    setSelectedCustomerIds((prev) => prev.filter((id) => id !== customerId));
    setFormData((prev) => ({
      ...prev,
      selectedCustomers: prev.selectedCustomers.filter((c) => c._id !== customerId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCustomerIds.length === 0) {
      errorNotify("Please select at least one customer");
      return;
    }

    const groupData = {
      name: formData.name,
      customer: selectedCustomerIds,
    };

    try {
      const result = await createGroup(groupData).unwrap();
      if (result.success) {
        successNotify(result.message || "Group created successfully!");
        navigate(adminRouteLinks.usersActive.path);
      }
    } catch (error) {
      console.error("Failed to create group:", error);
      const errorMsg =
        error?.data?.message || error?.error?.data?.message || "Failed to create group";
      errorNotify(errorMsg);
    }
  };

  const handleBack = () => {
    navigate(adminRouteLinks.usersActive.path);
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-4">

      {/* Main Content Card */}
      <div className="w-full bg-white rounded-3xl px-6 py-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-[32px] font-[900] font-barlowCondensed">
              ADD GROUP
            </h2>
            <p className="text-text-700 text-base">
              Purchases can be make by group-wise later.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Group Name"
                placeholder="Eg. Europe Tour Group"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <SelectInput
                label="Select Customers"
                placeHolder="Select customers"
                data={customerOptions}
                value={tempSelection}
                onValueChange={(value) => {
                  handleCustomerSelect(value);
                  setTempSelection("");
                }}
                disabled={isLoadingCustomers}
              />
            </div>

            {/* Selected Customers Display */}
            {selectedCustomerIds.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {formData.selectedCustomers.map((customer) => (
                    <span
                      key={customer._id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-gray-500 text-sm"
                    >
                      {customer.email}
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomer(customer._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 max-w-[548px]">
              <button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || selectedCustomerIds.length === 0}
                className="flex-1 px-6 py-3 bg-main-700 text-white rounded-full hover:bg-main-600 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Save Group"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddGroup;
