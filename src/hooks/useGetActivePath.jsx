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
  const { activePath } = useSelector((state) => state.shared);
  const pathname = location?.pathname;

  const checkAdminPaths = () => {
    if (pathname?.includes(adminRouteLinks.dashboard.activePath)) {
      dispatch(setActivePath(adminRouteLinks.dashboard.activePath));
    } else if (pathname?.includes(adminRouteLinks.orders.activePath)) {
      dispatch(setActivePath(adminRouteLinks.orders.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "orders" }));
    } else if (pathname?.includes(adminRouteLinks.staff.activePath)) {
      dispatch(setActivePath(adminRouteLinks.staff.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "staff" }));
    } else if (pathname?.includes("/admin/brick-list")) {
      dispatch(setActivePath(adminRouteLinks.brickList.activePath));
    } else if (pathname?.includes("/admin/my-esim")) {
      dispatch(setActivePath(adminRouteLinks.myEsim.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "myEsim" }));
    } else if (pathname?.includes("/admin/users")) {
      dispatch(setActivePath(adminRouteLinks.users.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "users" }));
    } else if (pathname?.includes("/admin/brick-stock")) {
      dispatch(setActivePath(adminRouteLinks.brickStock.activePath));
    } else if (pathname?.includes("/admin/brick-field")) {
      dispatch(setActivePath(adminRouteLinks.brickField.activePath));
    } else if (pathname?.includes(adminRouteLinks.profile.activePath)) {
      dispatch(setActivePath(adminRouteLinks.profile.activePath));
    } else if (pathname?.includes(adminRouteLinks.customers.activePath)) {
      dispatch(setActivePath(adminRouteLinks.customers.activePath));
      dispatch(forceSidebarSubmenuOpen({ menu: "customers" }));
    } else {
      dispatch(setActivePath(adminRouteLinks.dashboard.activePath));
    }
  };

  useEffect(() => {
    checkAdminPaths();
  }, [location?.pathname]);
  return { activePath };
}
