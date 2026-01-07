import UserLayout from "@/components/layout/UserLayout";
import Login from "@/pages/user/Login";
import { userRouteLinks } from "../services";
import { ForgotPassword } from "@/pages/user/ForgotPassword";
import Register from "@/pages/user/Register";

const { home, forgotPassword, register } = userRouteLinks || {};

export const userRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    {
      path: home.path,
      element: <Login />,
    },
    {
      path: forgotPassword.path,
      element: <ForgotPassword />,
    },
    {
      path: register.path,
      element: <Register />,
    },
  ],
};
