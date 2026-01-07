import SearchInput from "@/components/shared/SearchInput";
import LocationSelect from "@/components/shared/LocationSelect";
import { useActiveCustomers } from "@/hooks/useCustomers";
import { useLocation } from "@/hooks/useLocation";
import { ExportIconSvg } from "@/services";

function CustomerActiveHeader() {
  const {
    activeSearch,
    activeFilter,
    handleSearchChange,
    handleFilterChange,
    handleExportToExcel,
    isFetching,
    total_items,
  } = useActiveCustomers();

  const { divisions, districts, upazilas } = useLocation(
    activeFilter?.division,
    activeFilter?.district
  );

  const divisionId =
    divisions.find((d) => d.bn_name === activeFilter?.division)?.id ||
    activeFilter?.division ||
    "all";
  const districtId =
    districts.find((d) => d.bn_name === activeFilter?.district)?.id ||
    activeFilter?.district ||
    activeFilter;
  ("all");
  const upazilaId =
    upazilas.find((u) => u.bn_name === activeFilter?.upazila)?.id ||
    activeFilter?.upazila ||
    "all";

  const handleDivisionChange = (value) => {
    const divisionName =
      value === "all"
        ? "all"
        : divisions.find((d) => d.id === value)?.bn_name || value;
    handleFilterChange({ division: divisionName });
  };

  const handleDistrictChange = (value) => {
    const districtName =
      value === "all"
        ? "all"
        : districts.find((d) => d.id === value)?.bn_name || value;
    handleFilterChange({ district: districtName });
  };

  const handleUpazilaChange = (value) => {
    const upazilaName =
      value === "all"
        ? "all"
        : upazilas.find((u) => u.id === value)?.bn_name || value;
    handleFilterChange({ upazila: upazilaName });
  };

  return (
    <div className="w-full flex flex-col xl:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
        Active Customers ({total_items || 0})
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
          <button
            onClick={handleExportToExcel}
            className="w-full md:w-auto flex items-center gap-2 justify-center px-5 h-10 bg-natural-950 rounded-lg text-white text-sm font-medium font-inter tracking-wide whitespace-nowrap hover:bg-natural-800 transition-colors"
          >
            <span>
              <ExportIconSvg />{" "}
            </span>
            <span>Export to Excel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerActiveHeader;
