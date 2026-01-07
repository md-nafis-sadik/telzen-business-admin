import SearchInput from "@/components/shared/SearchInput";
import LocationSelect from "@/components/shared/LocationSelect";
import { useBlockedStaffs } from "@/hooks/useStaff";
import { useLocation } from "@/hooks";
import { Link } from "react-router-dom";

function StaffBlockedHeader() {
  const {
    staffs,
    blockedSearch,
    blockedFilter,
    handleSearchChange,
    handleFilterChange,
    isFetching,
    total_items,
  } = useBlockedStaffs();

  const { divisions, districts, upazilas } = useLocation();

  const handleDivisionChange = (value) => {
    if (value === "all") {
      handleFilterChange({ division: "all", district: "all", upazila: "all" });
    } else {
      const divisionName =
        divisions.find((d) => d.id === value)?.bn_name || value;
      handleFilterChange({
        division: divisionName,
        district: "all",
        upazila: "all",
      });
    }
  };

  const handleDistrictChange = (value) => {
    if (value === "all") {
      handleFilterChange({ ...blockedFilter, district: "all", upazila: "all" });
    } else {
      const districtName =
        districts.find((d) => d.id === value)?.bn_name || value;
      handleFilterChange({
        ...blockedFilter,
        district: districtName,
        upazila: "all",
      });
    }
  };

  const handleUpazilaChange = (value) => {
    if (value === "all") {
      handleFilterChange({ ...blockedFilter, upazila: "all" });
    } else {
      const upazilaName =
        upazilas.find((u) => u.id === value)?.bn_name || value;
      handleFilterChange({ ...blockedFilter, upazila: upazilaName });
    }
  };

  // Convert filter bn_name to ID for display
  const divisionId =
    divisions.find((d) => d.bn_name === blockedFilter?.division)?.id ||
    blockedFilter?.division ||
    "all";
  const districtId =
    districts.find((d) => d.bn_name === blockedFilter?.district)?.id ||
    blockedFilter?.district ||
    "all";
  const upazilaId =
    upazilas.find((u) => u.bn_name === blockedFilter?.upazila)?.id ||
    blockedFilter?.upazila ||
    "all";

  return (
    <div className="w-full flex flex-col xl:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
        Blocked Staff ({total_items || 0})
      </h1>
      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <LocationSelect
          divisionValue={divisionId}
          onDivisionChange={handleDivisionChange}
          districtValue={districtId}
          onDistrictChange={handleDistrictChange}
          upazilaValue={upazilaId}
          onUpazilaChange={handleUpazilaChange}
          className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4"
        />
        <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <SearchInput
            value={blockedSearch}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto"
          />
          {/* <Link to="/admin/staffs/blocked/add" className="w-full md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center px-5 h-10 bg-main-600 rounded-lg text-white text-sm font-medium font-hindSiliguri tracking-wide whitespace-nowrap">
              Add New
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default StaffBlockedHeader;
