import Dashboard from "@/pages/admin/Dashboard";
import Profile from "@/pages/admin/Forms/profile/Profile";
import AddStaff from "@/pages/admin/Forms/staffs/AddStaff";
import EditStaff from "@/pages/admin/Forms/staffs/EditStaff";
import Staff from "@/pages/admin/Staff/Staff";
import UsersActive from "@/pages/admin/Users/UsersActive";
import UsersBlocked from "@/pages/admin/Users/UsersBlocked";
import UserDetails from "@/pages/admin/Users/UserDetails";
import UsersGroupMembers from "@/pages/admin/Users/UsersGroupMembers";
import AdminLayout from "../components/layout/AdminLayout";
import RoleBasedRoute from "../components/shared/RoleBasedRoute";
import { adminRouteLinks } from "../services";
import PrivateRouter from "./PrivateRouter";
import MyEsimRegular from "@/pages/admin/MyESim/RegularEsim";
import MyEsimGroup from "@/pages/admin/MyESim/GroupEsim";
import GroupEsimDetails from "@/pages/admin/MyESim/GroupEsimDetails";
import AccountBalance from "@/pages/admin/AccountBalance/AccountBalance";
import BusinessProfile from "@/pages/admin/BusinessProfile/BusinessProfile";
import ContactSupport from "@/pages/admin/ContactSupport/ContactSupport";
import ApiSettings from "@/pages/admin/ApiSettings/ApiSettings";
import Inventory from "@/pages/admin/Inventory/Inventory";
import Packages from "@/pages/admin/Inventory/Packages";
import CheckoutWrapper from "@/pages/admin/Inventory/CheckoutWrapper";

const {
  dashboard,
  staff,
  usersActive,
  usersBlocked,
  usersDetails,
  usersGroupMembers,
  profile,
  addStaff,
  editStaff,
  regularEsim,
  groupEsim,
  accountBalance,
  inventory,
  inventoryPackages,
  inventoryCheckout,
  businessProfile,
  contactSupport,
  apiSettings,
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
      path: staff?.path,
      element: (
        <RoleBasedRoute requiredActivePath="staff">
          <Staff />
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
      path: "my-esim/group/:id",
      element: (
        <RoleBasedRoute requiredActivePath="myEsim">
          <GroupEsimDetails />
        </RoleBasedRoute>
      ),
    },
    {
      path: accountBalance?.path,
      element: (
        <RoleBasedRoute requiredActivePath="accountBalance">
          <AccountBalance />
        </RoleBasedRoute>
      ),
    },
    {
      path: inventory?.path,
      element: (
        <RoleBasedRoute requiredActivePath="inventory">
          <Inventory />
        </RoleBasedRoute>
      ),
    },
    {
      path: inventoryPackages?.path,
      element: (
        <RoleBasedRoute requiredActivePath="inventory">
          <Packages />
        </RoleBasedRoute>
      ),
    },
    {
      path: inventoryCheckout?.path,
      element: (
        <RoleBasedRoute requiredActivePath="inventory">
          <CheckoutWrapper />
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
      path: usersActive?.path,
      element: (
        <RoleBasedRoute requiredActivePath="users">
          <UsersActive />
        </RoleBasedRoute>
      ),
    },
    {
      path: usersBlocked?.path,
      element: (
        <RoleBasedRoute requiredActivePath="users">
          <UsersBlocked />
        </RoleBasedRoute>
      ),
    },
    {
      path: usersDetails?.path,
      element: (
        <RoleBasedRoute requiredActivePath="users">
          <UserDetails />
        </RoleBasedRoute>
      ),
    },
    {
      path: usersGroupMembers?.path,
      element: (
        <RoleBasedRoute requiredActivePath="users">
          <UsersGroupMembers />
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
    {
      path: businessProfile?.path,
      element: (
        <RoleBasedRoute requiredActivePath="businessProfile">
          <BusinessProfile />
        </RoleBasedRoute>
      ),
    },
    {
      path: contactSupport?.path,
      element: (
        <RoleBasedRoute requiredActivePath="contactSupport">
          <ContactSupport />
        </RoleBasedRoute>
      ),
    },
    {
      path: apiSettings?.path,
      element: (
        <RoleBasedRoute requiredActivePath="apiSettings">
          <ApiSettings />
        </RoleBasedRoute>
      ),
    },
  ],
};
