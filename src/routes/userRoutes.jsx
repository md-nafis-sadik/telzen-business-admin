import UserLayout from "@/components/layout/UserLayout";
import Login from "@/pages/user/Login";
import { userRouteLinks } from "../services";

const { home } = userRouteLinks || {};

export const userRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    {
      path: home.path,
      element: <Login />,
    }
  ],
};
