import UsersBlockedHeader from "@/components/users/blocked/UsersBlockedHeader";
import UsersBlockedRegularTable from "@/components/users/blocked/UsersBlockedRegularTable";
import UsersBlockedGroupTable from "@/components/users/blocked/UsersBlockedGroupTable";
import { useUserTabs } from "@/hooks";

function UsersBlocked() {
  const { currentTab } = useUserTabs("blocked");

  return (
    <div className="w-full flex flex-col gap-6">
      <UsersBlockedHeader />
      <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
        <div>
          {currentTab === "regular" ? (
            <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
              Users
            </h1>
          ) : (
            <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
              Groups
            </h1>
          )}
        </div>
        {currentTab === "regular" ? (
          <UsersBlockedRegularTable />
        ) : (
          <UsersBlockedGroupTable />
        )}
      </div>
    </div>
  );
}

export default UsersBlocked;
