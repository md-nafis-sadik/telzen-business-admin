import {
  setShowSidebar,
  setSidebarSubmenuOpen,
  toggleLogoutModal,
} from "@/features/shared/sharedSlice";
import { useLogout } from "@/hooks";
import useGetActivePath from "@/hooks/useGetActivePath";
import useNavigationAccess from "@/hooks/useNavigationAccess";
import {
  adminRouteLinks,
  BrickFieldIconSvg,
  BrickListIconSvg,
  BrickStckIconSvg,
  CartIconSvg,
  CustomerIconSvg,
  DashboardIconSvg,
  images,
  LogoBrickSvg,
  LogoTextSvg,
  LogoutDownIconSvg,
  OrdersIconSvg,
  StaffIconSvg,
} from "@/services";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavigateItem from "./NavigateItem";
import NavigationDropdownItem from "./NavigationDropdownItem";

function Sidebar() {
  const submenuRef = useRef({});

  const { showSidebar, sidebarSubmenuOpen } = useSelector(
    (state) => state.shared
  );
  const { activePath } = useGetActivePath();
  const {
    canAccessDashboard,
    canAccessStaff,
    canAccessCustomers,
    canAccessBrickList,
    canAccessBrickStock,
    canAccessBrickField,
    canAccessOrders,
    canAccessMyEsim,
    userRole,
  } = useNavigationAccess();

  const dispatch = useDispatch();
  const hideSidebar = () => {
    dispatch(setShowSidebar(false));
  };

  const handleDropdown = (menu) => {
    dispatch(setSidebarSubmenuOpen({ menu }));
  };
  const { performLogout, isLoggingOut } = useLogout();
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
                onClick={hideSidebar}
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

            {/* Brick List - Available for admin only */}
            {canAccessBrickList() && (
              <NavigateItem
                menu={adminRouteLinks?.brickList}
                isActive={activePath == adminRouteLinks?.brickList.activePath}
                icon={
                  <BrickListIconSvg
                    isActive={
                      activePath == adminRouteLinks?.brickList.activePath
                    }
                  />
                }
                onClick={hideSidebar}
              />
            )}

            {/* Brick Stock - Available for admin only */}
            {canAccessBrickStock() && (
              <NavigateItem
                menu={adminRouteLinks?.brickStock}
                isActive={activePath == adminRouteLinks?.brickStock.activePath}
                icon={
                  <BrickStckIconSvg
                    isActive={
                      activePath == adminRouteLinks?.brickStock.activePath
                    }
                  />
                }
                onClick={hideSidebar}
              />
            )}

            {/* Brick Field - Available for admin only */}
            {canAccessBrickField() && (
              <NavigateItem
                menu={adminRouteLinks?.brickField}
                isActive={activePath == adminRouteLinks?.brickField.activePath}
                icon={
                  <BrickFieldIconSvg
                    isActive={
                      activePath == adminRouteLinks?.brickField.activePath
                    }
                  />
                }
                onClick={hideSidebar}
              />
            )}

            {/* Orders - Available for admin only */}
            {canAccessOrders() && (
              <NavigationDropdownItem
                ref={submenuRef}
                name="orders"
                title="Orders"
                onClick={() => handleDropdown("orders")}
                icon={<OrdersIconSvg />}
                isActive={activePath === "orders"}
                links={[
                  adminRouteLinks?.ordersPending,
                  adminRouteLinks?.ordersValidation,
                  adminRouteLinks?.ordersProcessing,
                  adminRouteLinks?.ordersCompleted,
                  adminRouteLinks?.ordersCancelled,
                ]}
                isSubmenuOpen={sidebarSubmenuOpen}
                maxHeightClass="280px"
              />
            )}

            {/* All Customers - Available for admin only */}
            {canAccessCustomers() && (
              <NavigationDropdownItem
                ref={submenuRef}
                name="customers"
                title="All Customer"
                onClick={() => handleDropdown("customers")}
                icon={<CustomerIconSvg />}
                isActive={activePath == adminRouteLinks?.customers.activePath}
                links={[
                  adminRouteLinks?.customersPending,
                  adminRouteLinks?.customersActive,
                  adminRouteLinks?.customersBlocked,
                  adminRouteLinks?.customersRejected,
                ]}
                isSubmenuOpen={sidebarSubmenuOpen}
                maxHeightClass
              />
            )}

            {/* Staff - Available for admin only */}
            {canAccessStaff() && (
              <NavigationDropdownItem
                ref={submenuRef}
                name="staff"
                title="My Staff"
                onClick={() => handleDropdown("staff")}
                icon={<StaffIconSvg />}
                isActive={activePath == adminRouteLinks?.staff.activePath}
                links={[
                  adminRouteLinks?.staffActive,
                  adminRouteLinks?.staffBlocked,
                ]}
                isSubmenuOpen={sidebarSubmenuOpen}
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
