import SearchInput from "@/components/shared/SearchInput";
import { useRegularMyEsims } from "@/hooks";

function MyEsimRegularHeader() {
  const { regularSearch, handleSearchChange, isFetching } = useRegularMyEsims();

  return (
    <div className="w-full flex flex-col lg:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
      <div>
        <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
          My eSIM
        </h1>
        <p className="text-black-600 text-sm">Manage and Overview your eSIMs</p>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <SearchInput
            value={regularSearch}
            onChange={handleSearchChange}
            isSearching={isFetching}
            className="w-full md:w-auto"
          />

          <a
            href="https://www.telzen.net/destinations"
            className="w-full md:w-auto flex items-center justify-center px-5 h-[46px] bg-main-700 rounded-lg text-white text-sm font-semibold font-inter tracking-wide whitespace-nowrap"
          >
            Buy eSIM
          </a>
        </div>
      </div>
    </div>
  );
}

export default MyEsimRegularHeader;
