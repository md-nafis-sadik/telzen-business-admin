import BrickList from "@/pages/admin/BricKList";
import Dashboard from "@/pages/admin/Dashboard";
import AddBrick from "@/pages/admin/Forms/brickList/AddBrick";
import EditBrick from "@/pages/admin/Forms/brickList/EditBrick";
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
  brickList,
  addBrick,
  editBrick,
  brickStock,
  regularEsim,
  groupEsim,
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
      path: profile?.path,
      element: (
        <RoleBasedRoute requiredActivePath="profile">
          <Profile />
        </RoleBasedRoute>
      ),
    },
  ],
};
