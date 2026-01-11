import UserDetailsTable from "@/components/users/UserDetailsTable";
import RequestLoader from "@/components/shared/RequestLoader";
import { useUserDetails } from "@/hooks";

function UserDetails() {
  const { isLoading } = useUserDetails();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <UserDetailsTable />
      {isLoading && <RequestLoader />}
    </div>
  );
}

export default UserDetails;
