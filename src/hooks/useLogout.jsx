import { useDispatch, useSelector } from "react-redux";
import { logout, clearAuthState } from "@/features/auth/authSlice";
import { apiSlice } from "@/features/api/apiSlice";
import { setLogoutLoading } from "@/features/shared/sharedSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggingOut = useSelector((state) => state.shared.isLogoutLoading);

  const performLogout = async () => {
    if (isLoggingOut) return;

    try {
      dispatch(setLogoutLoading(true));

      navigate("/", { replace: true });

      dispatch(logout());

      dispatch(apiSlice.util.resetApiState());

      dispatch(clearAuthState());

      // Clear all auth and profile data from localStorage
      localStorage.removeItem("easybricks_admin");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/", { replace: true });
    } finally {
      dispatch(setLogoutLoading(false));
    }
  };

  return { performLogout, isLoggingOut };
};

export default useLogout;
