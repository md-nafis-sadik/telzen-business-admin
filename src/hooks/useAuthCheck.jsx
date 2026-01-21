import { decryptValue, errorNotify } from "@/services";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveAuthData, clearAuthState } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  const getAuthUserData = async () => {
    try {
      // Normal auth check from localStorage
      const localAuth = localStorage?.getItem("telzen_business_admin");
      
      
      if (localAuth) {
        const { data, error } = decryptValue(localAuth);
        
        if (error) {
          console.error("❌ Decryption failed:", error);
          dispatch(clearAuthState());
          setAuthChecked(true);
          return;
        }
        
        if (data) {
          const auth = JSON.parse(data);
          
          console.log("📦 Decrypted auth data:", { 
            hasToken: !!auth?.token, 
            role: auth?.role,
            expireAt: auth?.expireAt 
          });
          
          // Check if token exists
          if (auth?.token) {
            const currentTimestamp = moment().unix();
            const hasExpireAt = auth?.expireAt;
            const isExpired = hasExpireAt && auth.expireAt <= currentTimestamp;
            
            // Only clear if token is explicitly expired
            if (isExpired) {
              console.warn("⏰ Token expired, clearing auth");
              dispatch(clearAuthState());
              errorNotify("Login Session Expired");
            } else {
              // Token exists and is valid (or has no expiry set)
              dispatch(saveAuthData(auth));
            }
          } else {
            console.warn("⚠️ No token found in auth data, clearing state");
            // No token found, clear state
            dispatch(clearAuthState());
          }
        }
      } else {
        console.log("ℹ️ No auth data in localStorage");
      }
    } catch (error) {
      console.error("❌ Error checking auth:", error);
      // Don't clear state on error, just log it
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    getAuthUserData();
  }, []);
  return authChecked;
}
