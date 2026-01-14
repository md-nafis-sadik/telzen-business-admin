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
  BusinessProfileIconSvg,
  ContactSupportIconSvg,
  adminRouteLinks,
  CartIconSvg,
  DashboardIconSvg,
  images,
  LogoutDownIconSvg,
  StaffIconSvg,
  UserIconSvg,
  InventoryIconSvg,
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

  const menuItems = [
    {
      id: "dashboard",
      menu: adminRouteLinks?.dashboard,
      icon: (isActive) => <DashboardIconSvg isActive={isActive} />,
      canAccess: canAccessDashboard,
      type: "single",
    },
    {
      id: "myEsim",
      title: "My eSIM",
      menu: adminRouteLinks?.myEsim,
      icon: () => <CartIconSvg />,
      canAccess: canAccessMyEsim,
      type: "dropdown",
      subLinks: [adminRouteLinks?.regularEsim, adminRouteLinks?.groupEsim],
    },
    {
      id: "inventory",
      menu: adminRouteLinks?.inventory,
      icon: () => <InventoryIconSvg />,
      canAccess: canAccessInventory,
      type: "single",
    },
    {
      id: "users",
      title: "Users",
      menu: adminRouteLinks?.users,
      icon: () => <UserIconSvg />,
      canAccess: canAccessUsers,
      type: "dropdown",
      subLinks: [adminRouteLinks?.usersActive, adminRouteLinks?.usersBlocked],
    },
    {
      id: "accountBalance",
      menu: adminRouteLinks?.accountBalance,
      icon: () => <AccountBalanceIconSvg />,
      canAccess: canAccessAccountBalance,
      type: "single",
    },
    {
      id: "staff",
      menu: adminRouteLinks?.staff,
      icon: () => <StaffIconSvg />,
      canAccess: canAccessStaff,
      type: "single",
    },
    {
      id: "businessProfile",
      menu: adminRouteLinks?.businessProfile,
      icon: () => <BusinessProfileIconSvg />,
      canAccess: canAccessBusinessProfile,
      type: "single",
    },
    {
      id: "contactSupport",
      menu: adminRouteLinks?.contactSupport,
      icon: () => <ContactSupportIconSvg />,
      canAccess: canAccessContactSupport,
      type: "single",
    },
    {
      id: "apiSettings",
      menu: adminRouteLinks?.apiSettings,
      icon: () => <ApiSettingsIconSvg />,
      canAccess: canAccessApiSettings,
      type: "single",
    },
  ];

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
            {menuItems.map((item) => {
              // Check if user has access to this menu
              if (!item.canAccess()) return null;

              const isActive = activePath === item.menu?.activePath;

              // Render dropdown menu
              if (item.type === "dropdown") {
                return (
                  <NavigationDropdownItem
                    key={item.id}
                    ref={submenuRef}
                    name={item.id}
                    title={item.title}
                    onClick={() => handleDropdown(item.id)}
                    icon={item.icon(isActive)}
                    isActive={isActive}
                    links={item.subLinks}
                    isSubmenuOpen={sidebarSubmenuOpen}
                  />
                );
              }

              // Render single menu item
              return (
                <NavigateItem
                  key={item.id}
                  menu={item.menu}
                  isActive={isActive}
                  icon={item.icon(isActive)}
                  onClick={handleNavigateItemClick}
                />
              );
            })}
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
