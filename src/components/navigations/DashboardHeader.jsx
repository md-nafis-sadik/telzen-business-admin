import {
  setShowSidebar,
  toggleLogoutModal,
} from "@/features/shared/sharedSlice";
import { adminRouteLinks, images, LogoSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogsIcon } from "lucide-react";
import Breadcrumb from "../shared/Breadcrumb";
import { useRef } from "react";

function DashboardHeader() {
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { performLogout, isLoggingOut } = useLogout();
  const handleLogoutClick = () => {
    dispatch(toggleLogoutModal(true));
  };
  const navigateToUser = () => {
    navigate(adminRouteLinks.userProfile.path);
  };

  const userRole =
    auth.role === "admin"
      ? "Admin"
      : auth.role === "manager"
      ? "Manager"
      : auth.role === "customer_manager"
      ? "Customer Manager"
      : "Admin"; // Default to Admin if no role

  return (
    <header
      className={`py-4 px-6 bg-white shadow-nav flex items-center justify-between border-b-[1px] border-natural-200`}
    >
      <div className="flex items-center gap-4 md:hidden">
        <button type="button" onClick={() => dispatch(setShowSidebar(true))}>
          <LogsIcon />
        </button>
      </div>

      <div className="w-max md:w-full flex items-center justify-between gap-3 sm:gap-6">
        <Breadcrumb />
        <DropdownMenu>
          <DropdownMenuTrigger
            ref={dropdownRef}
            className="flex gap-3 focus-visible:outline-none"
          >
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2  outline-none">
              <img
                src={auth?.image || images.profileAvatar}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center text-left">
              <label className="self-stretch justify-start text-neutral-700 text-base font-bold font-['Inter'] leading-tight">
                {auth?.name}
              </label>
              <span
                className="self-stretch justify-start text-neutral-700 text-xs font-normal font-['Inter'] leading-none"
                htmlFor=""
              >
                {userRole}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="w-48 border-none border-lg"
          >
            <DropdownMenuItem
              className="cursor-pointer hover:bg-white-100 flex items-center gap-2 py-2.5"
              onClick={navigateToUser}
            >
              <Link
                to="/admin/profile"
                className="text-sm text-black-900 font-medium w-full"
              >
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-white-100 flex items-center gap-2 py-2.5"
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
            >
              <span className="text-sm text-black-900 font-medium">
                {isLoggingOut ? "Logging Out..." : "Log Out"}
              </span>
              {isLoggingOut && (
                <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* {isLoading && <RequestLoader />} */}
    </header>
  );
}

export default DashboardHeader;
