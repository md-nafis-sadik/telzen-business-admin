import SearchInput from "@/components/shared/SearchInput";
import { useStaffs } from "@/hooks";
import { Link } from "react-router-dom";

function StaffHeader() {
  const { search, handleSearchChange, isFetching, totalItems } = useStaffs();

  return (
    <div className="w-full flex flex-col lg:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <div>
        <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
          Staffs
        </h1>
        <p className="text-black-600 text-sm">List of management staffs</p>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          {/* Search input hidden but functional - keep for future use */}
          {/* <SearchInput
            value={search}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto"
          /> */}

          <Link to="/admin/staffs/add" className="w-full md:w-auto">
            <button className="btn_save">Add New</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StaffHeader;
