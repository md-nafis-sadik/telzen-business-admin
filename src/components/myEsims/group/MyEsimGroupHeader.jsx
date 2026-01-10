import SearchInput from "@/components/shared/SearchInput";
import LocationSelect from "@/components/shared/LocationSelect";
import { useGroupMyEsims, useLocation } from "@/hooks";
import { Link } from "react-router-dom";

function MyEsimGroupHeader() {
  const {
    myEsims,
    groupSearch,
    groupFilter,
    handleSearchChange,
    handleFilterChange,
    isFetching,
    total_items,
  } = useGroupMyEsims();

  return (
    <div className="w-full flex flex-col xl:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <div>
        <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
          My eSIM
        </h1>
        <p className="text-black-600 text-sm">Manage and Overview your eSIMs</p>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <SearchInput
            value={groupSearch}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto"
          />

          <button className="w-full md:w-auto flex items-center justify-center px-5 h-10 bg-main-700 rounded-lg text-white text-sm font-inter tracking-wide whitespace-nowrap font-semibold">
            Buy eSIM
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyEsimGroupHeader;
