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
  const canAccessInventory = () => hasAccess("inventory");
  const canAccessBusinessProfile = () => hasAccess("businessProfile");
  const canAccessUsers = () => hasAccess("users");
  const canAccessProfile = () => hasAccess("profile");
  const canAccessContactSupport = () => hasAccess("contactSupport");
  const canAccessApiSettings = () => hasAccess("apiSettings");

  return {
    hasAccess,
    canAccessDashboard,
    canAccessStaff,
    canAccessMyEsim,
    canAccessAccountBalance,
    canAccessInventory,
    canAccessBusinessProfile,
    canAccessUsers,
    canAccessProfile,
    canAccessContactSupport,
    canAccessApiSettings,
    userRole,
  };
};

export default useNavigationAccess;
