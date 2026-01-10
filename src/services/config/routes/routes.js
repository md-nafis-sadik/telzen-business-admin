export const adminRouteLinks = {
  dashboard: {
    name: "Dashboard",
    path: "/admin/dashboard",
    activePath: "dashboard",
  },
  staff: {
    name: "My Staff",
    path: "/admin/staffs",
    activePath: "staff",
  },
  staffActive: {
    name: "Active Staffs",
    path: "/admin/staffs/active",
    activePath: "staff",
  },
  staffBlocked: {
    name: "Blocked Staffs",
    path: "/admin/staffs/blocked",
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
  addStaff: {
    name: "Add Staff",
    path: "/admin/staffs/:slug/add",
    activePath: "staff",
  },
  editStaff: {
    name: "Edit Staff",
    path: "/admin/staffs/:slug/edit/:id",
    activePath: "staff",
  },
  staffDetails: {
    name: "Staff Details",
    path: "/admin/staffs/:slug/details/:id",
    activePath: "staff",
  },
  orders: {
    name: "Manage Orders",
    path: "/admin/orders",
    activePath: "orders",
  },
  ordersPending: {
    name: "Pending",
    path: "/admin/orders/pending",
    activePath: "orders",
  },
  ordersValidation: {
    name: "Validation",
    path: "/admin/orders/validation",
    activePath: "orders",
  },
  ordersProcessing: {
    name: "Processing",
    path: "/admin/orders/processing",
    activePath: "orders",
  },
  ordersCompleted: {
    name: "Completed",
    path: "/admin/orders/completed",
    activePath: "orders",
  },
  ordersCancelled: {
    name: "Cancelled",
    path: "/admin/orders/cancelled",
    activePath: "orders",
  },
  editOrder: {
    name: "Edit Order",
    path: "/admin/orders/:slug/edit/:id",
    activePath: "orders",
  },
  brickList: {
    name: "Brick List",
    path: "/admin/brick-list",
    activePath: "brickList",
  },
  addBrick: {
    name: "Add Brick",
    path: "/admin/brick-list/add",
    activePath: "brickList",
  },
  editBrick: {
    name: "Edit Brick",
    path: "/admin/brick-list/edit/:id",
    activePath: "brickList",
  },
  brickStock: {
    name: "Brick Stock",
    path: "/admin/brick-stock",
    activePath: "brickStock",
  },
  brickField: {
    name: "Brick Field",
    path: "/admin/brick-field",
    activePath: "brickField",
  },
  addBrickField: {
    name: "Add Brick Field",
    path: "/admin/brick-field/add",
    activePath: "brickField",
  },
  editBrickField: {
    name: "Edit Brick Field",
    path: "/admin/brick-field/edit/:id",
    activePath: "brickField",
  },
  customers: {
    name: "All Customer",
    path: "/admin/customers",
    activePath: "customers",
  },
  customersActive: {
    name: "Active Customers",
    path: "/admin/customers/active",
    activePath: "customers",
  },
  customersPending: {
    name: "Pending Customers",
    path: "/admin/customers/pending",
    activePath: "customers",
  },
  customersRejected: {
    name: "Rejected Customers",
    path: "/admin/customers/rejected",
    activePath: "customers",
  },
  customersDetails: {
    name: "Customer Details",
    path: "/admin/customers/:slug/details/:id",
    activePath: "customers",
  },
  customersBlocked: {
    name: "Blocked Customers",
    path: "/admin/customers/blocked",
    activePath: "customers",
  },
  profile: {
    name: "Profile",
    path: "/admin/profile",
    activePath: "profile",
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
