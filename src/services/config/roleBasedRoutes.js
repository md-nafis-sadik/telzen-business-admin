export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  CUSTOMER_MANAGER: "customer_manager",
};

export const rolePermissions = {
  [ROLES.ADMIN]: [
    "dashboard",
    "applications",
    "applicants",
    "destinations",
    "institutions",
    "services",
    "courses",
    "fundings",
    "vendors",
    "staff",
    "customers",
    "payments",
    "profile",
    "referrerWithdrawl",
    "brickList",
    "brickStock",
    "brickField",
    "orders",
  ],
  [ROLES.MANAGER]: [
    "dashboard",
    "applications",
    "applicants",
    "destinations",
    "institutions",
    "services",
    "profile",
  ],
  [ROLES.CUSTOMER_MANAGER]: [
    "dashboard",
    "applications",
    "applicants",
    "profile",
  ],
};

export const roleDefaultRoutes = {
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.MANAGER]: "/admin/dashboard",
  [ROLES.CUSTOMER_MANAGER]: "/admin/dashboard",
};

export const hasRouteAccess = (userRole, routeActivePath) => {
  if (!userRole || !routeActivePath) return false;

  const permissions = rolePermissions[userRole];
  if (!permissions) return false;

  return permissions.includes(routeActivePath);
};

export const getAccessibleRoutes = (userRole) => {
  if (!userRole) return [];
  return rolePermissions[userRole] || [];
};

export const getDefaultRoute = (userRole) => {
  return roleDefaultRoutes[userRole] || "/admin/dashboard";
};
