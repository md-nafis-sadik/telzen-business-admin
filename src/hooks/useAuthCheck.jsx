import { decryptValue, errorNotify } from "@/services";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  saveAuthData,
  clearAuthState,
} from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  const getAuthUserData = async () => {
    const localAuth = localStorage?.getItem("easybricks_admin");
    if (localAuth) {
      const { data } = decryptValue(localAuth);
      const auth = JSON.parse(data);
      const currentTimestamp = moment().unix();
      const checkExpire = auth?.expireAt > currentTimestamp;
      if (auth?.token) {
        if (checkExpire) {
          dispatch(saveAuthData(auth));
        } else {
          dispatch(clearAuthState());
          errorNotify("Login Session Expired");
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
