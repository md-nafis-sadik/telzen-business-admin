import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminRouteLinks, errorNotify } from "@/services";
import { useLazyFetchProfileQuery } from "@/features/auth/authApi";
import { saveAuthData, clearAuthState } from "@/features/auth/authSlice";
import RequestLoader from "./RequestLoader";
import moment from "moment";

export default function AutoLoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [fetchProfile] = useLazyFetchProfileQuery();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleAutoLogin = async () => {
      // Check if URL has token parameter (auto-login from external site)
      const searchParams = new URLSearchParams(location.search);
      const urlToken = searchParams.get("token");

      if (urlToken && !isProcessing) {
        setIsProcessing(true);
        // Auto-login with token from URL
        const futureDate = moment().add(30, "days");
        const expireAt = futureDate.unix();
        
        // Save token first
        dispatch(saveAuthData({ 
          token: urlToken, 
          expireAt 
        }));

        // Fetch profile data to complete user setup
        try {
          await fetchProfile().unwrap();
          // Redirect to dashboard after successful auto-login
          navigate(adminRouteLinks.dashboard.path, { replace: true });
        } catch (error) {
          console.error("Error fetching profile after auto-login:", error);
          errorNotify("Failed to fetch profile data");
          dispatch(clearAuthState());
          setIsProcessing(false);
        }
        return;
      }

      // Check if user has token from localStorage
      if (auth?.token && !urlToken) {
        // Redirect to dashboard if authenticated
        navigate(adminRouteLinks.dashboard.path, { replace: true });
      }
    };

    handleAutoLogin();
  }, [auth?.token, location.search, navigate, dispatch, fetchProfile, isProcessing]);

  // Show loader while processing token
  if (isProcessing) {
    return <RequestLoader />;
  }

  return null;
}
