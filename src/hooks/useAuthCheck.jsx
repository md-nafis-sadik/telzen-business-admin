import { decryptValue, errorNotify } from "@/services";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveAuthData, clearAuthState } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  const getAuthUserData = async () => {
    // Normal auth check from localStorage
    const localAuth = localStorage?.getItem("telzen_business_admin");
    if (localAuth) {
      const { data } = decryptValue(localAuth);
      if (data) {
        const auth = JSON.parse(data);
        const currentTimestamp = moment().unix();
        const checkExpire = auth?.expireAt && auth.expireAt > currentTimestamp;
        if (auth?.token) {
          if (checkExpire) {
            dispatch(saveAuthData(auth));
          } else {
            dispatch(clearAuthState());
            errorNotify(
              auth?.expireAt ? "Login Session Expired" : "Invalid session"
            );
          }
        } else {
          dispatch(clearAuthState());
        }
      } else {
        dispatch(clearAuthState());
      }
    }
    setAuthChecked(true);
  };

  useEffect(() => {
    getAuthUserData();
  }, []);
  return authChecked;
}
