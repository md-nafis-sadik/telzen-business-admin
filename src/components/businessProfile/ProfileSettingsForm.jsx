import { useState } from "react";
import Input from "@/components/shared/Input";
import CountrySelect from "@/components/shared/CountrySelect";
import { Building2 } from "lucide-react";
import { BigBuildingIconSvg } from "@/services";

function ProfileSettingsForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phoneNumber: "",
    country: null,
    contactPerson: "",
  });

  const [document, setDocument] = useState(null);

  // Sample countries data - you can replace with actual data
  const countries = [
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    // Add more countries as needed
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (country) => {
    setFormData((prev) => ({
      ...prev,
      country,
    }));
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocument(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData, document);
    // Add your submit logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business Icon */}
      <div className="flex mb-6">
        <div className="w-32 h-32 bg-natural-100 rounded-full flex items-center justify-center">
          <BigBuildingIconSvg />
        </div>
      </div>

      {/* Business Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Business Name"
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          placeholder="Enter business name"
          className="w-full"
        />
      </div>
      {/* Email and Country - Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="business@email.com"
          className="w-full"
          disabled
        />

        <Input
          label="Country"
          options={countries}
          value={formData.country}
          onChange={handleCountryChange}
          placeholder="Select country"
          className="w-full"
          disabled
        />

        {/* Phone Number and Contact Person - Row */}

        <Input
          label="Phone"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+44 1234567890"
          className="w-full"
          disabled
        />

        <Input
          label="Contact Person"
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleInputChange}
          placeholder="Enter contact person name"
          className="w-full"
        />
      </div>

      {/* Document Upload */}
      <div>
        {/* <label className="label mb-2 block">Document</label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="document-upload"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 13.3333L10 10M10 10L13.3333 13.3333M10 10V17.5M16.6667 13.9524C17.6846 13.1117 18.3333 11.8399 18.3333 10.4167C18.3333 7.88536 16.2813 5.83333 13.75 5.83333C13.5679 5.83333 13.3975 5.73833 13.3051 5.58145C12.2184 3.73736 10.212 2.5 7.91667 2.5C4.46489 2.5 1.66667 5.29822 1.66667 8.75C1.66667 10.4718 2.36289 12.0309 3.48912 13.1613"
                stroke="#344054"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {document ? "Change Document" : "Upload Document"}
            </span>
          </label>
          <input
            id="document-upload"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleDocumentUpload}
            className="hidden"
          />
          {document && ( */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.59 3.59C15.21 3.21 14.7 3 14.17 3H5C3.9 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 4.99 21H19C20.1 21 21 20.1 21 19V9.83C21 9.3 20.79 8.79 20.41 8.42L15.59 3.59ZM8 17C7.45 17 7 16.55 7 16C7 15.45 7.45 15 8 15C8.55 15 9 15.45 9 16C9 16.55 8.55 17 8 17ZM8 13C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.55 13 8 13ZM8 9C7.45 9 7 8.55 7 8C7 7.45 7.45 7 8 7C8.55 7 9 7.45 9 8C9 8.55 8.55 9 8 9ZM14 9V4.5L19.5 10H15C14.45 10 14 9.55 14 9Z"
              fill="black"
            />
          </svg>
          <span className="text-sm text-gray-700 font-medium">
            Document Uploaded
          </span>
        </div>
        {/* )}
        </div> */}
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" className="btn_save">
          SUBMIT
        </button>
      </div>
    </form>
  );
}

export default ProfileSettingsForm;
