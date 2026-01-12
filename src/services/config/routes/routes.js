export const adminRouteLinks = {
  dashboard: {
    name: "Dashboard",
    path: "/admin/dashboard",
    activePath: "dashboard",
  },
  staff: {
    name: "My Staffs",
    path: "/admin/staffs",
    activePath: "staff",
  },
  myEsim: {
    name: "My eSIM",
    path: "/admin/my-esim",
    activePath: "myEsim",
  },
  regularEsim: {
    name: "Regular",
    path: "/admin/my-esim/regular",
    activePath: "myEsim",
  },
  groupEsim: {
    name: "Group eSIM",
    path: "/admin/my-esim/group",
    activePath: "myEsim",
  },
  accountBalance: {
    name: "Account Balance",
    path: "/admin/account-balance",
    activePath: "accountBalance",
  },
  inventory: {
    name: "Inventory",
    path: "/admin/inventory",
    activePath: "inventory",
  },
  inventoryPackages: {
    name: "Packages",
    path: "/admin/inventory/packages/:id",
    activePath: "inventory",
  },
  inventoryCheckout: {
    name: "Checkout",
    path: "/admin/inventory/checkout/:id",
    activePath: "inventory",
  },
  addStaff: {
    name: "Add Staff",
    path: "/admin/staffs/add",
    activePath: "staff",
  },
  editStaff: {
    name: "Edit Staff",
    path: "/admin/staffs/edit/:id",
    activePath: "staff",
  },
  users: {
    name: "Users",
    path: "/admin/users",
    activePath: "users",
  },
  usersActive: {
    name: "Active",
    path: "/admin/users/active",
    activePath: "users",
  },
  usersBlocked: {
    name: "Blocked",
    path: "/admin/users/blocked",
    activePath: "users",
  },
  usersDetails: {
    name: "User Details",
    path: "/admin/users/:slug/details/:id",
    activePath: "users",
  },
  usersGroupMembers: {
    name: "Group Members",
    path: "/admin/users/:slug/group/:id",
    activePath: "users",
  },
  profile: {
    name: "Profile",
    path: "/admin/profile",
    activePath: "profile",
  },
  businessProfile: {
    name: "Business Profile",
    path: "/admin/business-profile",
    activePath: "businessProfile",
  },
  contactSupport: {
    name: "Contact Support",
    path: "/admin/contact-support",
    activePath: "contactSupport",
  },
  apiSettings: {
    name: "API Settings",
    path: "/admin/api-settings",
    activePath: "apiSettings",
  },
};

export const userRouteLinks = {
  home: {
    name: "Home",
    path: "/",
  },
  forgotPassword: {
    name: "Forgot Password",
    path: "/forgot-password",
  },
  register: {
    name: "Register",
    path: "/register",
  },
};
