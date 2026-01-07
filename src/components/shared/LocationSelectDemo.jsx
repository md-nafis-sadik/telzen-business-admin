import LocationSelect from "@/components/shared/LocationSelect";
import { useState } from "react";

// Test component to demonstrate the LocationSelect functionality
function LocationSelectDemo() {
  const [selectedValues, setSelectedValues] = useState({
    division: "all",
    district: "all",
    upazila: "all",
  });

  const handleDivisionChange = (value) => {
    setSelectedValues((prev) => ({
      ...prev,
      division: value,
      district: "all", // Reset dependent values
      upazila: "all",
    }));
  };

  const handleDistrictChange = (value) => {
    setSelectedValues((prev) => ({
      ...prev,
      district: value,
      upazila: "all", // Reset dependent values
    }));
  };

  const handleUpazilaChange = (value) => {
    setSelectedValues((prev) => ({
      ...prev,
      upazila: value,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Location Selection Demo</h2>

      <LocationSelect
        divisionValue={selectedValues.division}
        onDivisionChange={handleDivisionChange}
        districtValue={selectedValues.district}
        onDistrictChange={handleDistrictChange}
        upazilaValue={selectedValues.upazila}
        onUpazilaChange={handleUpazilaChange}
      />

      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Selected Values:</h3>
        <div className="space-y-1 text-sm">
          <div>Division: {selectedValues.division}</div>
          <div>District: {selectedValues.district}</div>
          <div>Upazila: {selectedValues.upazila}</div>
        </div>
      </div>
    </div>
  );
}

export default LocationSelectDemo;
