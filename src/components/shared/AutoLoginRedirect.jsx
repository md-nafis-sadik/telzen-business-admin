import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminRouteLinks, errorNotify, userRouteLinks } from "@/services";
import { useGetUserProfileQuery } from "@/features/auth/authApi";
import { saveAuthData, clearAuthState } from "@/features/auth/authSlice";
import RequestLoader from "./RequestLoader";
import moment from "moment";

export default function AutoLoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenFromUrl, setTokenFromUrl] = useState(null);
  const [hasHandledError, setHasHandledError] = useState(false);

  // Only fetch profile if we have a token from URL and it's saved in Redux
  const shouldFetchProfile = tokenFromUrl && auth?.token === tokenFromUrl && !hasHandledError;
  const { isLoading: isLoadingProfile, isSuccess, isError, error } = useGetUserProfileQuery(undefined, {
    skip: !shouldFetchProfile,
  });

  useEffect(() => {
    const handleAutoLogin = async () => {
      // Only process token on login/home route
      const isLoginRoute = location.pathname === userRouteLinks.home.path || location.pathname === "/";
      
      if (!isLoginRoute) {
        return;
      }

      // Check if URL has token parameter (auto-login from external site)
      const searchParams = new URLSearchParams(location.search);
      const urlToken = searchParams.get("token");

      if (urlToken && !isProcessing) {
        setIsProcessing(true);
        setTokenFromUrl(urlToken);
        
        // Auto-login with token from URL
        const futureDate = moment().add(30, "days");
        const expireAt = futureDate.unix();
        
        console.log("Saving token to Redux and localStorage:", urlToken);
        
        // Save token first - this will trigger localStorage save in authSlice
        dispatch(saveAuthData({ 
          token: urlToken, 
          expireAt,
          role: "super-admin" // Default role for token-based login
        }));
        
        // Profile fetch will be triggered automatically by shouldFetchProfile
        return;
      }

      // Check if user has token from localStorage and is on login page
      // BUT don't redirect if we're currently processing a token from URL (wait for profile fetch)
      if (auth?.token && !urlToken && isLoginRoute && !isProcessing && !tokenFromUrl) {
        // Redirect to dashboard if authenticated
        navigate(adminRouteLinks.dashboard.path, { replace: true });
      }
    };

    handleAutoLogin();
  }, [location.search, location.pathname, navigate, dispatch, isProcessing, tokenFromUrl]);

  // Handle profile fetch success/error
  useEffect(() => {
    if (isSuccess && tokenFromUrl) {
      console.log("✅ Profile fetched successfully, redirecting to dashboard");
      // Redirect after successful profile fetch
      setTimeout(() => {
        navigate(adminRouteLinks.dashboard.path, { replace: true });
      }, 500);
    }
    
    if (isError && tokenFromUrl && !hasHandledError) {
      console.error("❌ Failed to fetch profile, error object:", JSON.stringify(error, null, 2));
      
      // RTK Query error structure: error.status and error.data
      // Check for various error types
      const is401 = error?.status === 401 || error?.status === "UNAUTHORIZED" || error?.data?.status_code === 401;
      const is404 = error?.status === 404 || error?.originalStatus === 404 || error?.status === "PARSING_ERROR" && error?.originalStatus === 404;
      
      let errorMessage = "Failed to load profile data";
      
      // Extract error message based on error type
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (is404) {
        errorMessage = "Profile endpoint not found. Please contact support.";
      } else if (is401) {
        errorMessage = "Unauthorized access - Invalid token";
      }
      
      console.log("🔍 Error details:", {
        status: error?.status,
        originalStatus: error?.originalStatus,
        statusCode: error?.data?.status_code,
        is401,
        is404,
        message: errorMessage
      });
      
      if (is401) {
        console.log("🚫 401 Unauthorized - Invalid token, logging out");
      } else if (is404) {
        console.log("🚫 404 Not Found - Endpoint doesn't exist");
      }
      
      errorNotify(errorMessage);
      
      // Clear auth state and reset
      console.log("🧹 Clearing auth state and redirecting to login");
      dispatch(clearAuthState());
      setHasHandledError(true);
      setIsProcessing(false);
      setTokenFromUrl(null);
      
      // Redirect to home/login page
      navigate(userRouteLinks.home.path, { replace: true });
    }
  }, [isSuccess, isError, tokenFromUrl, navigate, dispatch, error, hasHandledError]);

  // Show loader while processing token or fetching profile
  if (isProcessing || isLoadingProfile) {
    return <RequestLoader />;
  }

  return null;
}
