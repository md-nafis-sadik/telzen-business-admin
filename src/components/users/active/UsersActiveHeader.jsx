import SearchInput from "@/components/shared/SearchInput";
import {
  useActiveRegularUsers,
  useActiveGroupUsers,
  useUserTabs,
} from "@/hooks";

function UsersActiveHeader() {
  const regularHook = useActiveRegularUsers();
  const groupHook = useActiveGroupUsers();
  const { currentTab, handleTabChange } = useUserTabs("active");

  const { activeSearch, handleSearchChange, isFetching } =
    currentTab === "regular" ? regularHook : groupHook;

  return (
    <div className="w-full flex justify-between gap-4">
      {/* Tab Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleTabChange("regular")}
          className={`px-4 py-2 h-[48px] rounded-lg font-semibold transition-all ${
            currentTab === "regular"
              ? "bg-main-700 text-white"
              : "bg-black text-white hover:bg-text-900"
          }`}
        >
          Regular
        </button>
        <button
          onClick={() => handleTabChange("group")}
          className={`px-4 py-2 h-[48px] rounded-lg font-semibold transition-all ${
            currentTab === "group"
              ? "bg-main-700 text-white"
              : "bg-black text-white hover:bg-text-900"
          }`}
        >
          Group Users
        </button>
      </div>

      <SearchInput
        value={activeSearch}
        onChange={handleSearchChange}
        isSearching={isFetching}
        className="w-full md:w-auto"
        inputClassName="bg-transparent"
      />
    </div>
  );
}

export default UsersActiveHeader;
