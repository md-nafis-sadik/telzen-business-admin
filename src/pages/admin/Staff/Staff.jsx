import StaffHeader from "@/components/staffs/StaffHeader";
import StaffTable from "@/components/staffs/StaffTable";
import StaffBlockModal from "@/components/staffs/StaffBlockModal";
import StaffSuccessModal from "@/components/staffs/StaffSuccessModal";

function Staff() {
  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <StaffHeader />
      <StaffTable />
      <StaffBlockModal />
      <StaffSuccessModal />
    </div>
  );
}

export default Staff;
