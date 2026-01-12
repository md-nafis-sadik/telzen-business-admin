import { useState } from "react";
import Input from "@/components/shared/Input";

function BusinessSettingsForm() {
  const [formData, setFormData] = useState({
    discountRate: "",
    priceMarkup: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers
    if (value === "" || /^\d+$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Business settings submitted:", formData);
    // Add your submit logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Package Discount Rate and Package Price Markup - Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Package Discount Rate(%)"
          type="text"
          name="discountRate"
          value={formData.discountRate}
          onChange={handleInputChange}
          placeholder="10"
          className="w-full"
          disabled
        />

        <Input
          label="Package Price Markup(%)"
          type="text"
          name="priceMarkup"
          value={formData.priceMarkup}
          onChange={handleInputChange}
          placeholder="10"
          className="w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="">
        <button type="submit" className="btn_save">
          SUBMIT
        </button>
      </div>
    </form>
  );
}

export default BusinessSettingsForm;
