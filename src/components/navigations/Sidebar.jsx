import {
  setShowSidebar,
  setSidebarSubmenuOpen,
  toggleLogoutModal,
} from "@/features/shared/sharedSlice";
import { useLogout } from "@/hooks";
import useGetActivePath from "@/hooks/useGetActivePath";
import useNavigationAccess from "@/hooks/useNavigationAccess";
import {
  AccountBalanceIconSvg,
  ApiSettingsIconSvg,
  BrickFieldIconSvg,
  BusinessProfileIconSvg,
  ContactSupportIconSvg,
  adminRouteLinks,
  CartIconSvg,
  DashboardIconSvg,
  images,
  LogoutDownIconSvg,
  StaffIconSvg,
  UserIconSvg,
  SimIconSvg,
  InventoryIconSvg,
} from "@/services";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavigateItem from "./NavigateItem";
import NavigationDropdownItem from "./NavigationDropdownItem";
import Inventory from "@/pages/admin/Inventory/Inventory";

function Sidebar() {
  const submenuRef = useRef({});

  const { showSidebar, sidebarSubmenuOpen } = useSelector(
    (state) => state.shared
  );
  const { activePath } = useGetActivePath();
  const {
    canAccessDashboard,
    canAccessStaff,
    canAccessUsers,
    canAccessMyEsim,
    canAccessAccountBalance,
    canAccessInventory,
    canAccessBusinessProfile,
    canAccessContactSupport,
    canAccessApiSettings,
  } = useNavigationAccess();
  const { isLoggingOut } = useLogout();

  const dispatch = useDispatch();
  const hideSidebar = () => {
    dispatch(setShowSidebar(false));
  };

  const handleDropdown = (menu) => {
    dispatch(setSidebarSubmenuOpen({ menu }));
  };

  const handleNavigateItemClick = () => {
    dispatch(setSidebarSubmenuOpen({ menu: null }));
    hideSidebar();
  };

  const handleLogoutClick = () => {
    dispatch(toggleLogoutModal(true));
  };

  return (
    <aside className="relative h-full overflow-auto no-scrollbar shrink-0 select-none sidebar">
      <div
        className={`w-[232px] bg-natural-950 px-4 pt-10 pb-6 shrink-0 h-full flex flex-col fixed lg:relative top-0 left-0 ${
          showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } duration-300 z-[99]`}
      >
        <Link
          to={adminRouteLinks.dashboard.path}
          className="max-w-max sticky top-0"
        >
          <div className="flex items-center gap-[10px]">
            <img
              src={images.mainLogo}
              alt="EasyBrick Logo"
              className="w-[119px]"
            />
          </div>
        </Link>
        <div className="h-full overflow-auto no-scrollbar mt-[52px]">
          {/* nav items  */}
          <div className="flex flex-col text-base gap-1 text-black-900">
            {/* Dashboard - Always visible for authenticated users */}
            {canAccessDashboard() && (
              <NavigateItem
                menu={adminRouteLinks?.dashboard}
                isActive={activePath == adminRouteLinks?.dashboard.activePath}
                icon={
                  <DashboardIconSvg
                    isActive={
                      activePath == adminRouteLinks?.dashboard.activePath
                    }
                  />
                }
                onClick={handleNavigateItemClick}
              />
            )}

            {/* Staff - Available for admin only */}
            {canAccessMyEsim() && (
              <NavigationDropdownItem
                ref={submenuRef}
                name="myEsim"
                title="My eSIM"
                onClick={() => handleDropdown("myEsim")}
                icon={<CartIconSvg />}
                isActive={activePath == adminRouteLinks?.myEsim.activePath}
                links={[
                  adminRouteLinks?.regularEsim,
                  adminRouteLinks?.groupEsim,
                ]}
                isSubmenuOpen={sidebarSubmenuOpen}
              />
            )}

            {/* Users - Available for admin only */}
            {canAccessUsers() && (
              <NavigationDropdownItem
                ref={submenuRef}
                name="users"
                title="Users"
                onClick={() => handleDropdown("users")}
                icon={<UserIconSvg />}
                isActive={activePath == adminRouteLinks?.users.activePath}
                links={[
                  adminRouteLinks?.usersActive,
                  adminRouteLinks?.usersBlocked,
                ]}
                isSubmenuOpen={sidebarSubmenuOpen}
              />
            )}

            {/* Account Balance - Available for admin only */}
            {canAccessAccountBalance() && (
              <NavigateItem
                menu={adminRouteLinks?.accountBalance}
                isActive={
                  activePath == adminRouteLinks?.accountBalance.activePath
                }
                icon={<AccountBalanceIconSvg />}
                onClick={handleNavigateItemClick}
              />
            )}

            {/* Inventory - Available for admin only */}
            {canAccessInventory() && (
              <NavigateItem
                menu={adminRouteLinks?.inventory}
                isActive={activePath == adminRouteLinks?.inventory.activePath}
                icon={<InventoryIconSvg />}
                onClick={handleNavigateItemClick}
              />
            )}

            {/* Staff - Available for admin only */}
            {canAccessStaff() && (
              <NavigateItem
                menu={adminRouteLinks?.staff}
                isActive={activePath == adminRouteLinks?.staff.activePath}
                icon={<StaffIconSvg />}
                onClick={handleNavigateItemClick}
              />
            )}

            {/* Business Profile - Available for admin only */}
            {canAccessBusinessProfile() && (
              <NavigateItem
                menu={adminRouteLinks?.businessProfile}
                isActive={
                  activePath == adminRouteLinks?.businessProfile.activePath
                }
                icon={<BusinessProfileIconSvg />}
                onClick={handleNavigateItemClick}
              />
            )}

            {/* Contact Support - Available for admin only */}
            {canAccessContactSupport() && (
              <NavigateItem
                menu={adminRouteLinks?.contactSupport}
                isActive={
                  activePath == adminRouteLinks?.contactSupport.activePath
                }
                icon={<ContactSupportIconSvg />}
                onClick={handleNavigateItemClick}
              />
            )}

            {/* API Settings - Available for admin only */}
            {canAccessApiSettings() && (
              <NavigateItem
                menu={adminRouteLinks?.apiSettings}
                isActive={
                  activePath == adminRouteLinks?.apiSettings.activePath
                }
                icon={<ApiSettingsIconSvg />}
                onClick={handleNavigateItemClick}
              />
            )}
          </div>
        </div>

        <label
          htmlFor="logoutPopup"
          className="py-3 px-3 border-t border-[#303030] flex items-center gap-2 text-sm cursor-pointer"
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
        >
          <span>
            <LogoutDownIconSvg />
          </span>
          <span className={`duration-300 whitespace-nowrap text-main-700`}>
            Log Out
          </span>
        </label>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black-900/40 duration-200 z-[60] ${
          showSidebar ? "block lg:hidden" : "hidden"
        }`}
        onClick={hideSidebar}
      ></div>
    </aside>
  );
}

export default Sidebar;
