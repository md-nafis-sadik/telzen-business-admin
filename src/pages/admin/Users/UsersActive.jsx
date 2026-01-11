import UsersActiveHeader from "@/components/users/active/UsersActiveHeader";
import UsersActiveRegularTable from "@/components/users/active/UsersActiveRegularTable";
import UsersActiveGroupTable from "@/components/users/active/UsersActiveGroupTable";
import { useUserTabs } from "@/hooks";

function UsersActive() {
  const { currentTab } = useUserTabs("active");

  return (
    <div className="w-full flex flex-col gap-6">
      <UsersActiveHeader />
      <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
        {currentTab === "regular" ? (
          <UsersActiveRegularTable />
        ) : (
          <UsersActiveGroupTable />
        )}
      </div>
    </div>
  );
}

export default UsersActive;
