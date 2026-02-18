import SearchInput from "@/components/shared/SearchInput";
import { useNavigate } from "react-router-dom";
import {
  useActiveRegularUsers,
  useGroupUsers,
  useUserTabs,
} from "@/hooks";
import { adminRouteLinks } from "@/services";

function UsersActiveHeader() {
  const navigate = useNavigate();
  const regularHook = useActiveRegularUsers();
  const groupHook = useGroupUsers();
  const { currentTab, handleTabChange } = useUserTabs("active");

  const { activeSearch, handleSearchChange, isFetching } =
    currentTab === "regular" ? regularHook : groupHook;

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-4">
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

      {/* Right side - Search and Action Buttons */}
      <div className="flex items-center gap-4 flex-wrap">
        <SearchInput
          value={activeSearch}
          onChange={handleSearchChange}
          isSearching={isFetching}
          className="w-full md:w-auto"
          inputClassName="bg-transparent"
        />

        {currentTab === "regular" ? (
          <>
            <button
              onClick={() => navigate(`${adminRouteLinks.usersActive.path}/add-customer`)}
              className="px-4 py-2 h-[48px] bg-main-700 text-white rounded-lg font-semibold hover:bg-main-600 transition-colors whitespace-nowrap"
            >
              Add Customer
            </button>
            <button
              onClick={() => navigate(`${adminRouteLinks.usersActive.path}/bulk-upload`)}
              className="px-4 py-2 h-[48px] bg-[#FFB94A] text-white rounded-lg font-semibold hover:bg-[#e9a334] transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19.41 7.41L14.58 2.58C14.21 2.21 13.7 2 13.17 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.41ZM14.8 15H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V15H9.21C8.76 15 8.54 14.46 8.86 14.15L11.66 11.36C11.86 11.17 12.17 11.17 12.37 11.36L15.16 14.15C15.46 14.46 15.24 15 14.8 15ZM14 9C13.45 9 13 8.55 13 8V3.5L18.5 9H14Z" fill="#FAFAFA"/>
</svg>
              </span>
              Bulk Upload
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate(`${adminRouteLinks.usersActive.path}/add-group`)}
            className="px-4 py-2 h-[48px] bg-main-700 text-white rounded-lg font-semibold hover:bg-main-600 transition-colors whitespace-nowrap"
          >
            Add Group
          </button>
        )}
      </div>
    </div>
  );
}

export default UsersActiveHeader;
