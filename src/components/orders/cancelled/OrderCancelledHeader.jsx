import SearchInput from "@/components/shared/SearchInput";
import LocationSelect from "@/components/shared/LocationSelect";
import { useCancelledOrders } from "@/hooks/useOrders";
import { useLocation } from "@/hooks/useLocation";

function OrderCancelledHeader() {
  const {
    orders,
    cancelledSearch,
    cancelledFilter,
    handleSearchChange,
    handleFilterChange,
    isFetching,
    total_items,
  } = useCancelledOrders();

  const { divisions, districts, upazilas } = useLocation(
    cancelledFilter?.division,
    cancelledFilter?.district
  );

  // Convert bn_name to ID for LocationSelect value
  const divisionId = divisions.find(d => d.bn_name === cancelledFilter?.division)?.id || cancelledFilter?.division || "all";
  const districtId = districts.find(d => d.bn_name === cancelledFilter?.district)?.id || cancelledFilter?.district || "all";
  const upazilaId = upazilas.find(u => u.bn_name === cancelledFilter?.upazila)?.id || cancelledFilter?.upazila || "all";

  const handleDivisionChange = (value) => {
    const divisionName = value === "all" ? "all" : divisions.find(d => d.id === value)?.bn_name || value;
    handleFilterChange({ division: divisionName });
  };

  const handleDistrictChange = (value) => {
    const districtName = value === "all" ? "all" : districts.find(d => d.id === value)?.bn_name || value;
    handleFilterChange({ district: districtName });
  };

  const handleUpazilaChange = (value) => {
    const upazilaName = value === "all" ? "all" : upazilas.find(u => u.id === value)?.bn_name || value;
    handleFilterChange({ upazila: upazilaName });
  };

  return (
    <div className="w-full flex flex-col xl:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
        Cancelled Orders ({total_items || 0})
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
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
          <SearchInput
            value={cancelledSearch}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default OrderCancelledHeader;
