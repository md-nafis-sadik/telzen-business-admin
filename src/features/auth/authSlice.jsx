import { encryptValue } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
  userRole: null, // Store user role separately for easier access
  profile: {
    name: "",
    email: "",
    phone: "",
    uid: "",
    country: null,
    image: null,
    document: null,
    role: "",
    business: {
      uid: "",
      name: "",
      email: "",
      markup_percentage: {
        discount: 0,
        price_increase: 0,
      },
      access_code: "",
      secret_key: "",
    },
    is_blocked: false,
    created_at: null,
  },
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
        state.userRole = "super-admin";
        state.auth.role = "super-admin";
      }

      const { data, error } = encryptValue(JSON.stringify(state.auth));

      if (error) {
        console.error("❌ Encryption failed:", error);
      } else {
        localStorage.setItem("telzen_business_admin", data);
      }

      state.previews = state.auth?.image ? [state.auth?.image] : [];
    },
    initiateAuthData: (state, action) => {
      state.auth = { ...action?.payload };
      // Store user role for easy access, default to 'admin' if not provided
      if (action?.payload?.role) {
        state.userRole = action.payload.role;
      } else if (action?.payload?.token) {
        // If logging in with token but no role, set default to admin
        state.userRole = "super-admin";
        state.auth.role = "super-admin";
      }
      const { data } = encryptValue(JSON.stringify(state.auth));
      localStorage.setItem("telzen_business_admin", data);
      state.previews = state.auth?.image ? [state.auth?.image] : [];
    },
    updateAuth: (state, action) => {
      state.auth = { ...state.auth, ...action.payload };
      if (action.payload?.role) {
        state.userRole = action.payload.role;
      }
    },
    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
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
      state.profile = {
        name: "",
        email: "",
        phone: "",
        uid: "",
        country: null,
        image: null,
        document: null,
        role: "",
        business: {
          uid: "",
          name: "",
          email: "",
          markup_percentage: {
            discount: 0,
            price_increase: 0,
          },
          access_code: "",
          secret_key: "",
        },
        is_blocked: false,
        created_at: null,
      };
      state.files = [];
      state.previews = [];
      state.document = null;
      state.selectedUser = {};
      state.users = [];
      state.userIds = [];
      localStorage.removeItem("telzen_business_admin");
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
  setProfile,
  logout,
  clearAuthState,
  setFiles,
  setPreviews,
} = authSlice.actions;
export default authSlice.reducer;
