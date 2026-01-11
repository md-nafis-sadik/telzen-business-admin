import UsersGroupMembersTable from "@/components/users/UsersGroupMembersTable";
import { useParams } from "react-router-dom";

function UsersGroupMembers() {
  const { id } = useParams();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <div className="mb-4">
        <h1 className="text-lg font-semibold">Group Users</h1>
        <p className="text-black-600 text-sm">View group members</p>
      </div>
      <UsersGroupMembersTable />
    </div>
  );
}

export default UsersGroupMembers;
