import { encryptValue } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
  userRole: null, // Store user role separately for easier access
  files: [],
  previews: [],
  document: null,
  selectedUser: {},
  users: [],
  userIds: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.auth = { ...state.auth, ...action?.payload };
      // Store user role for easy access, default to 'admin' if not provided
      if (action?.payload?.role) {
        state.userRole = action.payload.role;
      } else if (action?.payload?.token && !state.userRole) {
        // If logging in with token but no role, set default to admin
        state.userRole = "admin";
        state.auth.role = "admin";
      }
      const { data } = encryptValue(JSON.stringify(state.auth));
      localStorage.setItem("easybricks_admin", data);
      state.previews = state.auth?.image ? [state.auth?.image] : [];
    },
    initiateAuthData: (state, action) => {
      state.auth = { ...action?.payload };
      // Store user role for easy access, default to 'admin' if not provided
      if (action?.payload?.role) {
        state.userRole = action.payload.role;
      } else if (action?.payload?.token) {
        // If logging in with token but no role, set default to admin
        state.userRole = "admin";
        state.auth.role = "admin";
      }
      const { data } = encryptValue(JSON.stringify(state.auth));
      localStorage.setItem("easybricks_admin", data);
      state.previews = state.auth?.image ? [state.auth?.image] : [];
    },
    updateAuth: (state, action) => {
      state.auth = { ...state.auth, ...action.payload };
      if (action.payload?.role) {
        state.userRole = action.payload.role;
      }
    },
    logout: (state) => {
      return {
        ...initialState,
        files: state.files,
        previews: state.previews,
      };
    },

    clearAuthState: (state) => {
      state.auth = {};
      state.userRole = null;
      state.files = [];
      state.previews = [];
      state.document = null;
      state.selectedUser = {};
      state.users = [];
      state.userIds = [];
      localStorage.removeItem("easybricks_admin");
    },

    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setPreviews: (state, action) => {
      state.previews = action.payload;
    },
  },
});

export const {
  saveAuthData,
  initiateAuthData,
  updateAuth,
  logout,
  clearAuthState,
  setFiles,
  setPreviews,
} = authSlice.actions;
export default authSlice.reducer;
