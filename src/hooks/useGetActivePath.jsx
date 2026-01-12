import {
  setActivePath,
  forceSidebarSubmenuOpen,
} from "@/features/shared/sharedSlice";
import { adminRouteLinks } from "@/services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function useGetActivePath() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activePath } = useSelector((state) => state.shared || {});
  const pathname = location?.pathname;

  const checkAdminPaths = () => {
    if (pathname?.includes(adminRouteLinks.dashboard.activePath)) {
      dispatch(setActivePath(adminRouteLinks.dashboard.activePath));
    } else if (pathname?.includes(adminRouteLinks.staff.activePath)) {
      dispatch(setActivePath(adminRouteLinks.staff.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "staff" }));
    } else if (pathname?.includes("/admin/my-esim")) {
      dispatch(setActivePath(adminRouteLinks.myEsim.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "myEsim" }));
    } else if (pathname?.includes("/admin/users")) {
      dispatch(setActivePath(adminRouteLinks.users.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "users" }));
    } else if (pathname?.includes("/admin/account-balance")) {
      dispatch(setActivePath(adminRouteLinks.accountBalance.activePath));
    } else if (pathname?.includes("/admin/business-profile")) {
      dispatch(setActivePath(adminRouteLinks.businessProfile.activePath));
    } else if (pathname?.includes(adminRouteLinks.profile.activePath)) {
      dispatch(setActivePath(adminRouteLinks.profile.activePath));
    } else {
      dispatch(setActivePath(adminRouteLinks.dashboard.activePath));
    }
  };

  useEffect(() => {
    checkAdminPaths();
  }, [location?.pathname]);
  return { activePath };
}
