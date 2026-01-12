import { useSelector } from "react-redux";
import { hasRouteAccess } from "@/services";

export const useNavigationAccess = () => {
  const { userRole } = useSelector((state) => state.auth);

  const hasAccess = (activePath) => {
    return hasRouteAccess(userRole, activePath);
  };

  const canAccessDashboard = () => hasAccess("dashboard");
  const canAccessStaff = () => hasAccess("staff");
  const canAccessMyEsim = () => hasAccess("myEsim");
  const canAccessAccountBalance = () => hasAccess("accountBalance");
  const canAccessBusinessProfile = () => hasAccess("businessProfile");
  const canAccessUsers = () => hasAccess("users");
  const canAccessProfile = () => hasAccess("profile");

  return {
    hasAccess,
    canAccessDashboard,
    canAccessStaff,
    canAccessMyEsim,
    canAccessAccountBalance,
    canAccessBusinessProfile,
    canAccessUsers,
    canAccessProfile,
    userRole,
  };
};

export default useNavigationAccess;
