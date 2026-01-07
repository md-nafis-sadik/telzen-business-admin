import SelectInput from "@/components/shared/SelectInput";
import SelectSkeleton from "@/components/shared/SelectSkeleton";
import { useLocation } from "@/hooks/useLocation";
import { useEffect } from "react";

function LocationSelect({
  divisionValue,
  onDivisionChange,
  divisionTriggerClassName = "w-full md:w-[169px] min-h-[40px] p-3 data-[placeholder]:text-natural-400",

  districtValue,
  onDistrictChange,
  districtTriggerClassName = "w-full md:w-[169px] min-h-[40px] p-3 data-[placeholder]:text-natural-400",

  upazilaValue,
  onUpazilaChange,
  upazilaTriggerClassName = "w-full md:w-[169px] min-h-[40px] p-3 data-[placeholder]:text-natural-400",

  showDivision = true,
  showDistrict = true,
  showUpazila = true,

  // Layout
  className = "flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4",
}) {
  const {
    divisions,
    districts,
    upazilas,
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
  } = useLocation(divisionValue, districtValue);

  const isDivisionSelected = divisionValue && divisionValue !== "all";
  const isDistrictSelected = districtValue && districtValue !== "all";

  const formattedDivisions = [
    { id: "all", label: "All Divisions", bn_name: "All Divisions" },
    ...divisions.map((division) => ({
      ...division,
      label: division.bn_name || division.label || division.name,
    })),
  ];

  const formattedDistricts = isDivisionSelected && districts.length > 0
    ? [
        { id: "all", label: "All Districts", bn_name: "All Districts" },
        ...districts.map((district) => ({
          ...district,
          label: district.bn_name || district.label || district.name,
        })),
      ]
    : [];

  const formattedUpazilas = isDistrictSelected && upazilas.length > 0
    ? [
        { id: "all", label: "All Upazilas", bn_name: "All Upazilas" },
        ...upazilas.map((upazila) => ({
          ...upazila,
          label: upazila.bn_name || upazila.label || upazila.name,
        })),
      ]
    : [];
  
  const hasDistricts = formattedDistricts.length > 1; 
  const hasUpazilas = formattedUpazilas.length > 1; 

  const handleInternalDivisionChange = (value) => {

    onDistrictChange?.("all");
    onUpazilaChange?.("all");
    onDivisionChange?.(value);
  };

  const handleInternalDistrictChange = (value) => {

    onUpazilaChange?.("all");
    onDistrictChange?.(value);
  };

  const handleInternalUpazilaChange = (value) => {
    onUpazilaChange?.(value);
  };

  return (
    <div className={className}>
      {/* Division Select */}
      {showDivision && (
        <>
          {divisionsLoading ? (
            <SelectSkeleton triggerClassName={divisionTriggerClassName} />
          ) : (
            <SelectInput
              triggerClassName={divisionTriggerClassName}
              data={formattedDivisions}
              placeHolder="Division"
              labelKey="label"
              selector="id"
              value={divisionValue || "all"}
              parentClassName="w-full"
              onValueChange={handleInternalDivisionChange}
            />
          )}
        </>
      )}

      {/* District Select */}
      {showDistrict && (
        <>
          {districtsLoading ? (
            <SelectSkeleton triggerClassName={districtTriggerClassName} />
          ) : (
            <SelectInput
              triggerClassName={districtTriggerClassName}
              data={
                isDivisionSelected && hasDistricts
                  ? formattedDistricts
                  : [
                      {
                        id: "all",
                        label: !isDivisionSelected
                          ? "Select Division first"
                          : "No districts found",
                      },
                    ]
              }
              placeHolder="District"
              labelKey="label"
              selector="id"
              value={isDivisionSelected ? districtValue || "all" : "all"}
              onValueChange={handleInternalDistrictChange}
              disabled={!isDivisionSelected}
              parentClassName="w-full"
            />
          )}
        </>
      )}

      {/* Upazila Select */}
      {showUpazila && (
        <>
          {upazilasLoading ? (
            <SelectSkeleton triggerClassName={upazilaTriggerClassName} />
          ) : (
            <SelectInput
              triggerClassName={upazilaTriggerClassName}
              data={
                isDistrictSelected && hasUpazilas
                  ? formattedUpazilas
                  : [
                      {
                        id: "all",
                        label: !isDistrictSelected
                          ? "Select District first"
                          : "No upazilas found",
                      },
                    ]
              }
              placeHolder="Upazila"
              labelKey="label"
              selector="id"
              value={isDistrictSelected ? upazilaValue || "all" : "all"}
              onValueChange={handleInternalUpazilaChange}
              parentClassName="w-full"
              disabled={!isDistrictSelected}
            />
          )}
        </>
      )}
    </div>
  );
}

export default LocationSelect;
