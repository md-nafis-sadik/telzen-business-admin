import { Outlet } from "react-router-dom";
import DashboardHeader from "../navigations/DashboardHeader";
import DashboardFooter from "../navigations/DashoboardFooter";
import Sidebar from "../navigations/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../shared/Modal";
import { DeletePopupIconSvg } from "@/services";
import { useLogout } from "@/hooks";
import { toggleLogoutModal } from "@/features/shared/sharedSlice";

function AdminLayout() {
  const dispatch = useDispatch();
  const { showLogoutModal } = useSelector((state) => state.shared);
  const { performLogout } = useLogout();

  const blockConfirmHandler = async () => {
    performLogout();

    dispatch(toggleLogoutModal(false));
  };
  return (
    <main className="flex h-screen overflow-hidden ">
      <div className="h-full flex w-full">
        <Sidebar />
        {/* <SidebarTour /> */}
        <div className="w-full h-full flex flex-col overflow-x-hidden">
          <DashboardHeader />
          <div className="flex-1 justify-between md:overflow-auto no-scrollbar bg-neutral-100 p-4 flex flex-col gap-6">
            <Outlet />
            <DashboardFooter />
            <Modal
              confirmButtonClass="btn_delete h-12 !w-full text-sm"
              cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
              confirmButton="Logout"
              title="Are you sure you want to logout?"
              cancelButton="No, Thanks"
              titleClass="text-text-700 leading-normal w-[400px]"
              actionPara="Once logged out, you will need to login again to access your account."
              popupIcon={<DeletePopupIconSvg />}
              showModal={showLogoutModal}
              onClose={() => {
                dispatch(toggleLogoutModal(false));
              }}
              confirmHandeler={blockConfirmHandler}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;
