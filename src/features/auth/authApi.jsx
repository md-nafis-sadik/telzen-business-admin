import moment from "moment";
import { apiSlice } from "../api/apiSlice";
import { saveAuthData, updateAuth, clearAuthState, setProfile } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register mutation
    register: builder.mutation({
      query: (formData) => ({
        url: "/auth/registration", // This should be your register endpoint
        method: "POST",
        body: formData,
      }),
    }),
    login: builder.mutation({
      query: (formData) => ({
        url: "/auth/login",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data } = await queryFulfilled;
          const results = data?.data;
          const futureDate = moment().add(30, "days");
          const expireAt = futureDate.unix();
          // Save all profile data from login response directly
          dispatch(saveAuthData({ ...results, expireAt }));
        } catch (error) {
          console.error("Error", error);
          return { error };
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/profile`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const currentAuth = getState().auth.auth;
          dispatch(
            saveAuthData({
              ...result?.data?.data,
              expireAt: currentAuth?.expireAt,
            })
          );
        } catch (error) {
          return { error };
        }
      },
    }),

    getProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const profileData = result?.data?.data;
          
          // Update auth slice with profile data including role
          dispatch(
            updateAuth({
              name: profileData?.name,
              image: profileData?.image,
              email: profileData?.email,
              role: profileData?.role,
            })
          );
          
          // Store complete profile data in profile state
          dispatch(setProfile(profileData));
        } catch (error) {
          console.error("Error updating profile data:", error);
          // Handle 401 Unauthorized - clear auth and throw error for component to handle
          if (error?.error?.status === 401 || error?.error?.data?.status_code === 401) {
            console.log("🚫 Unauthorized access - clearing auth state");
            dispatch(clearAuthState());
            // Re-throw the error so AutoLoginRedirect can handle it
            throw error;
          }
        }
      },
    }),

    uploadProfileImage: builder.mutation({
      query: (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        return {
          url: `/auth/profile`,
          method: "POST",
          body: formData,
        };
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Update auth slice with new image
          if (result?.data?.data?.image) {
            dispatch(
              updateAuth({
                image: result?.data?.data?.image,
              })
            );
          }
        } catch (error) {
          console.error("Error updating profile image:", error);
        }
      },
    }),

    // Fetch profile data after auto-login
    fetchProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
        method: "GET",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data } = await queryFulfilled;
          const profileData = data?.data;
          const currentAuth = getState().auth.auth;
          const futureDate = moment().add(30, "days");
          const expireAt = currentAuth?.expireAt || futureDate.unix();
          
          // Save complete profile data with token preserved
          dispatch(saveAuthData({ 
            ...profileData, 
            token: currentAuth?.token,
            expireAt,
            role: profileData?.role || "super-admin" // Ensure role is set
          }));
          
          // Store complete profile data in profile state
          dispatch(setProfile(profileData));
        } catch (error) {
          console.error("Error fetching profile:", error);
          return { error };
        }
      },
    }),

    // Update business profile
    updateBusinessProfile: builder.mutation({
      query: (data) => ({
        url: `/staff/update/own-profile`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const updatedProfile = result?.data?.data;
          
          // Update profile state with new data
          if (updatedProfile) {
            dispatch(setProfile(updatedProfile));
            
            // Also update auth if business name changed
            if (updatedProfile?.business?.name) {
              dispatch(
                updateAuth({
                  business: updatedProfile.business,
                })
              );
            }
          }
        } catch (error) {
          console.error("Error updating business profile:", error);
          return { error };
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useUploadProfileImageMutation,
  useRegisterMutation,
  useFetchProfileQuery,
  useLazyFetchProfileQuery,
  useUpdateBusinessProfileMutation,
} = authApi;
