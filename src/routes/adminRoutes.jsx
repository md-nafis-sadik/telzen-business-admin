import BrickField from "@/pages/admin/BricKField";
import BrickList from "@/pages/admin/BricKList";
import BrickStock from "@/pages/admin/BrickStock";
import CustomerDetails from "@/pages/admin/Customers/CustomerDetails";
import CustomersPending from "@/pages/admin/Customers/CustomerPending";
import CustomersRejected from "@/pages/admin/Customers/CustomerRejected";
import CustomersActive from "@/pages/admin/Customers/CustomersActive";
import CustomersBlocked from "@/pages/admin/Customers/CustomersBlocked";
import Dashboard from "@/pages/admin/Dashboard";
import AddBrickField from "@/pages/admin/Forms/brickField/AddBrickField";
import EditBrickField from "@/pages/admin/Forms/brickField/EditBrickField";
import AddBrick from "@/pages/admin/Forms/brickList/AddBrick";
import EditBrick from "@/pages/admin/Forms/brickList/EditBrick";
import EditOrder from "@/pages/admin/Forms/orders/EditOrder";
import Profile from "@/pages/admin/Forms/profile/Profile";
import AddStaff from "@/pages/admin/Forms/staffs/AddStaff";
import EditStaff from "@/pages/admin/Forms/staffs/EditStaff";
import OrdersCancelled from "@/pages/admin/Orders/OrdersCancelled";
import OrdersCompleted from "@/pages/admin/Orders/OrdersCompleted";
import OrdersPending from "@/pages/admin/Orders/OrdersPending";
import StaffActive from "@/pages/admin/Staff/StaffActive";
import StaffBlocked from "@/pages/admin/Staff/StaffBlocked";
import StaffDetails from "@/pages/admin/Staff/StaffDetails";
import AdminLayout from "../components/layout/AdminLayout";
import RoleBasedRoute from "../components/shared/RoleBasedRoute";
import { adminRouteLinks } from "../services";
import PrivateRouter from "./PrivateRouter";
import OrdersValidation from "@/pages/admin/Orders/OrdersValidation";
import OrdersProcessing from "@/pages/admin/Orders/OrdersProcessing";
import MyEsimRegular from "@/pages/admin/MyESim/RegularEsim";
import MyEsimGroup from "@/pages/admin/MyESim/GroupEsim";

const {
  dashboard,
  staffActive,
  staffBlocked,
  staffDetails,
  customersActive,
  customersPending,
  customersRejected,
  customersBlocked,
  customersDetails,
  profile,
  addStaff,
  editStaff,
  brickList,
  addBrick,
  editBrick,
  brickStock,
  brickField,
  addBrickField,
  editBrickField,
  ordersPending,
  ordersValidation,
  ordersProcessing,
  ordersCompleted,
  ordersCancelled,
  regularEsim,
  groupEsim,
  editOrder: editOrderRoute,
} = adminRouteLinks || {};

export const adminRoutes = {
  path: "/admin",
  element: (
    <PrivateRouter>
      <AdminLayout />
    </PrivateRouter>
  ),
  children: [
    {
      path: dashboard?.path,
      element: (
        <RoleBasedRoute requiredActivePath="dashboard">
          <Dashboard />
        </RoleBasedRoute>
      ),
    },
    {
      path: staffActive?.path,
      element: (
        <RoleBasedRoute requiredActivePath="staff">
          <StaffActive />
        </RoleBasedRoute>
      ),
    },
    {
      path: staffBlocked?.path,
      element: (
        <RoleBasedRoute requiredActivePath="staff">
          <StaffBlocked />
        </RoleBasedRoute>
      ),
    },
    {
      path: regularEsim?.path,
      element: (
        <RoleBasedRoute requiredActivePath="myEsim">
          <MyEsimRegular />
        </RoleBasedRoute>
      ),
    },
    {
      path: groupEsim?.path,
      element: (
        <RoleBasedRoute requiredActivePath="myEsim">
          <MyEsimGroup />
        </RoleBasedRoute>
      ),
    },
    {
      path: addStaff?.path,
      element: (
        <RoleBasedRoute requiredActivePath="staff">
          <AddStaff />
        </RoleBasedRoute>
      ),
    },
    {
      path: editStaff?.path,
      element: (
        <RoleBasedRoute requiredActivePath="staff">
          <EditStaff />
        </RoleBasedRoute>
      ),
    },
    {
      path: staffDetails?.path,
      element: (
        <RoleBasedRoute requiredActivePath="staff">
          <StaffDetails />
        </RoleBasedRoute>
      ),
    },
    {
      path: customersActive?.path,
      element: (
        <RoleBasedRoute requiredActivePath="customers">
          <CustomersActive />
        </RoleBasedRoute>
      ),
    },
    {
      path: customersPending?.path,
      element: (
        <RoleBasedRoute requiredActivePath="customers">
          <CustomersPending />
        </RoleBasedRoute>
      ),
    },
    {
      path: customersRejected?.path,
      element: (
        <RoleBasedRoute requiredActivePath="customers">
          <CustomersRejected />
        </RoleBasedRoute>
      ),
    },
    {
      path: customersDetails?.path,
      element: (
        <RoleBasedRoute requiredActivePath="customers">
          <CustomerDetails />
        </RoleBasedRoute>
      ),
    },
    {
      path: customersBlocked?.path,
      element: (
        <RoleBasedRoute requiredActivePath="customers">
          <CustomersBlocked />
        </RoleBasedRoute>
      ),
    },
    {
      path: brickList?.path,
      element: (
        <RoleBasedRoute requiredActivePath="brickList">
          <BrickList />
        </RoleBasedRoute>
      ),
    },
    {
      path: addBrick?.path,
      element: (
        <RoleBasedRoute requiredActivePath="brickList">
          <AddBrick />
        </RoleBasedRoute>
      ),
    },
    {
      path: editBrick?.path,
      element: (
        <RoleBasedRoute requiredActivePath="brickList">
          <EditBrick />
        </RoleBasedRoute>
      ),
    },
    {
      path: brickStock?.path,
      element: (
        <RoleBasedRoute requiredActivePath="brickStock">
          <BrickStock />
        </RoleBasedRoute>
      ),
    },
    {
      path: brickField?.path,
      element: (
        <RoleBasedRoute requiredActivePath="brickField">
          <BrickField />
        </RoleBasedRoute>
      ),
    },
    {
      path: addBrickField?.path,
      element: (
        <RoleBasedRoute requiredActivePath="brickField">
          <AddBrickField />
        </RoleBasedRoute>
      ),
    },
    {
      path: editBrickField?.path,
      element: (
        <RoleBasedRoute requiredActivePath="brickField">
          <EditBrickField />
        </RoleBasedRoute>
      ),
    },
    {
      path: profile?.path,
      element: (
        <RoleBasedRoute requiredActivePath="profile">
          <Profile />
        </RoleBasedRoute>
      ),
    },

    // Orders routes
    {
      path: ordersPending?.path,
      element: (
        <RoleBasedRoute requiredActivePath="orders">
          <OrdersPending />
        </RoleBasedRoute>
      ),
    },
    {
      path: ordersValidation?.path,
      element: (
        <RoleBasedRoute requiredActivePath="orders">
          <OrdersValidation />
        </RoleBasedRoute>
      ),
    },
    {
      path: ordersProcessing?.path,
      element: (
        <RoleBasedRoute requiredActivePath="orders">
          <OrdersProcessing />
        </RoleBasedRoute>
      ),
    },
    {
      path: ordersCompleted?.path,
      element: (
        <RoleBasedRoute requiredActivePath="orders">
          <OrdersCompleted />
        </RoleBasedRoute>
      ),
    },
    {
      path: ordersCancelled?.path,
      element: (
        <RoleBasedRoute requiredActivePath="orders">
          <OrdersCancelled />
        </RoleBasedRoute>
      ),
    },
    {
      path: editOrderRoute?.path,
      element: (
        <RoleBasedRoute requiredActivePath="orders">
          <EditOrder />
        </RoleBasedRoute>
      ),
    },
  ],
};
