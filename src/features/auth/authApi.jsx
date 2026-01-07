import moment from "moment";
import { apiSlice } from "../api/apiSlice";
import { saveAuthData, updateAuth } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register mutation
    register: builder.mutation({
      query: (formData) => ({
        url: "/admin/registration", // This should be your register endpoint
        method: "POST",
        body: formData,
      }),
    }),
    login: builder.mutation({
      query: (formData) => ({
        url: "/admin/login",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const results = data?.data;
          const currentDate = moment();
          const futureDate = currentDate.add(30, "days");
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
        url: `/admin/profile`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(saveAuthData(result?.data?.data));
        } catch (error) {
          return { error };
        }
      },
    }),

    getProfile: builder.query({
      query: () => ({
        url: `/admin/user_profile`,
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: `/admin/user_profile`,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Update auth slice with profile data including role
          dispatch(
            updateAuth({
              name: result?.data?.data?.name,
              image: result?.data?.data?.image,
              email: result?.data?.data?.email,
              role: result?.data?.data?.role,
            })
          );
        } catch (error) {
          console.error("Error updating profile data:", error);
        }
      },
    }),

    uploadProfileImage: builder.mutation({
      query: (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        return {
          url: `/admin/user_profile`,
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
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useUploadProfileImageMutation,
  useRegisterMutation,
} = authApi;
