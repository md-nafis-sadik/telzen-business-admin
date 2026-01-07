import { adminRouteLinks, userRouteLinks, getDefaultRoute } from "@/services";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRouter({ children }) {
  const { auth, userRole } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin");

  if (auth?.token) {
    if (isAdminRoute) {
      return <>{children}</>;
    } else {
      const defaultRoute = userRole
        ? getDefaultRoute(userRole)
        : adminRouteLinks.dashboard.path;
      return <Navigate to={defaultRoute} state={{ from: location }} replace />;
    }
  }

  return (
    <Navigate
      to={userRouteLinks.home.path}
      state={{ from: location }}
      replace
    />
  );
}

export default PrivateRouter;
