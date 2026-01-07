import SearchInput from "@/components/shared/SearchInput";
import { useBrickStock } from "@/hooks/useBrickStock";

function BrickStockHeader() {
  const { search, handleSearchChange, isFetching, total_items } =
    useBrickStock();

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
        Brick Stock ({total_items || 0})
      </h1>
      <div className="w-full md:w-auto flex items-center gap-3 md:gap-4">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          isSearching={isFetching}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
}

export default BrickStockHeader;
