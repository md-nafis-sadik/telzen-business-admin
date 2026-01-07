import { Link } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import { useBrickList } from "@/hooks/useBrickList";

function BrickListHeader() {
  const { search, handleSearchChange, isFetching, total_items } =
    useBrickList();

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 justify-start md:justify-between">
      <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
        Brick List ({total_items || 0})
      </h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto"
          />
          <Link
            to="/admin/brick-list/add"
            className="flex items-center justify-center px-5 h-10 bg-main-700 rounded-lg text-white text-sm font-medium font-inter tracking-wide whitespace-nowrap"
          >
            Add New
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BrickListHeader;
