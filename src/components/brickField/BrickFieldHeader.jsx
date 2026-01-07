import LocationSelect from "@/components/shared/LocationSelect";
import SearchInput from "@/components/shared/SearchInput";
import { useBrickField } from "@/hooks/useBrickField";
import { useLocation } from "@/hooks/useLocation";
import { Link } from "react-router-dom";

function BrickFieldHeader() {
  const {
    filter,
    search,
    handleFilterChange,
    handleSearchChange,
    isFetching,
    total_items,
  } = useBrickField();

  const { divisions, districts, upazilas } = useLocation(filter?.division, filter?.district);

  const handleDivisionChange = (value) => {
    const divisionName = value === "all" ? "" : divisions.find(d => d.id === value)?.bn_name || "";
    handleFilterChange({ division: divisionName, district: "", sub_district: "" });
  };

  const handleDistrictChange = (value) => {
    const districtName = value === "all" ? "" : districts.find(d => d.id === value)?.bn_name || "";
    handleFilterChange({ ...filter, district: districtName, sub_district: "" });
  };

  const handleSubDistrictChange = (value) => {
    const upazilaName = value === "all" ? "" : upazilas.find(u => u.id === value)?.bn_name || "";
    handleFilterChange({ ...filter, sub_district: upazilaName });
  };

  return (
    <div className="w-full flex flex-col xl:flex-row items-start md:items-center gap-2 md:gap-0 justify-start md:justify-between">
      <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
        Brick Field List ({total_items || 0})
      </h1>

      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <LocationSelect
          divisionValue={filter?.division ? divisions.find(d => d.bn_name === filter.division)?.id : "all"}
          onDivisionChange={handleDivisionChange}
          districtValue={filter?.district ? districts.find(d => d.bn_name === filter.district)?.id : "all"}
          onDistrictChange={handleDistrictChange}
          upazilaValue={filter?.sub_district ? upazilas.find(u => u.bn_name === filter.sub_district)?.id : "all"}
          onUpazilaChange={handleSubDistrictChange}
          className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4"
        />
        <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto !min-h-[40px]"
          />
          <Link
            to="/admin/brick-field/add"
            className="w-full md:w-auto flex items-center justify-center px-5 h-10 bg-main-600 rounded-lg text-white text-sm font-medium font-hindSiliguri tracking-wide whitespace-nowrap"
          >
            Add New
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BrickFieldHeader;
