import SearchInput from "@/components/shared/SearchInput";
import LocationSelect from "@/components/shared/LocationSelect";
import { useActiveStaffs } from "@/hooks/useStaff";
import { useLocation } from "@/hooks";
import { Link } from "react-router-dom";

function StaffActiveHeader() {
  const {
    staffs,
    activeSearch,
    activeFilter,
    handleSearchChange,
    handleFilterChange,
    isFetching,
    total_items,
  } = useActiveStaffs();

  const { divisions, districts, upazilas } = useLocation();

  const handleDivisionChange = (value) => {
    if (value === "all") {
      handleFilterChange({ division: "all", district: "all", upazila: "all" });
    } else {
      const divisionName = divisions.find(d => d.id === value)?.bn_name || value;
      handleFilterChange({ division: divisionName, district: "all", upazila: "all" });
    }
  };

  const handleDistrictChange = (value) => {
    if (value === "all") {
      handleFilterChange({ ...activeFilter, district: "all", upazila: "all" });
    } else {
      const districtName = districts.find(d => d.id === value)?.bn_name || value;
      handleFilterChange({ ...activeFilter, district: districtName, upazila: "all" });
    }
  };

  const handleUpazilaChange = (value) => {
    if (value === "all") {
      handleFilterChange({ ...activeFilter, upazila: "all" });
    } else {
      const upazilaName = upazilas.find(u => u.id === value)?.bn_name || value;
      handleFilterChange({ ...activeFilter, upazila: upazilaName });
    }
  };

  // Convert filter bn_name to ID for display
  const divisionId = divisions.find(d => d.bn_name === activeFilter?.division)?.id || activeFilter?.division || "all";
  const districtId = districts.find(d => d.bn_name === activeFilter?.district)?.id || activeFilter?.district || "all";
  const upazilaId = upazilas.find(u => u.bn_name === activeFilter?.upazila)?.id || activeFilter?.upazila || "all";

  return (
    <div className="w-full flex flex-col xl:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
        Active Staff ({total_items || 0})
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
            value={activeSearch}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto"
          />
          <Link to="/admin/staffs/active/add" className="w-full md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center px-5 h-10 bg-main-600 rounded-lg text-white text-sm font-medium font-hindSiliguri tracking-wide whitespace-nowrap">
              Add New
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StaffActiveHeader;
