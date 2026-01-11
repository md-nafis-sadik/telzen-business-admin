import { apiSlice } from "../api/apiSlice";
import {
  setActiveRegularUsers,
  setActiveGroupUsers,
  setBlockedRegularUsers,
  setBlockedGroupUsers,
  setSingleUser,
} from "./usersSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Active Regular Users
    getActiveRegularUsers: builder.query({
      query: ({ current_page = 1, per_page = 10, search = "" }) => {
        let url = `/admin/users/active/regular?page=${current_page}&per_page=${per_page}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setActiveRegularUsers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        } catch (error) {
          dispatch(
            setActiveRegularUsers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        }
      },
    }),

    // Get Active Group Users
    getActiveGroupUsers: builder.query({
      query: ({ current_page = 1, per_page = 10, search = "" }) => {
        let url = `/admin/users/active/group?page=${current_page}&per_page=${per_page}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setActiveGroupUsers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        } catch (error) {
          dispatch(
            setActiveGroupUsers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        }
      },
    }),

    // Get Blocked Regular Users
    getBlockedRegularUsers: builder.query({
      query: ({ current_page = 1, per_page = 10, search = "" }) => {
        let url = `/admin/users/blocked/regular?page=${current_page}&per_page=${per_page}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setBlockedRegularUsers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        } catch (error) {
          dispatch(
            setBlockedRegularUsers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        }
      },
    }),

    // Get Blocked Group Users
    getBlockedGroupUsers: builder.query({
      query: ({ current_page = 1, per_page = 10, search = "" }) => {
        let url = `/admin/users/blocked/group?page=${current_page}&per_page=${per_page}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setBlockedGroupUsers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        } catch (error) {
          dispatch(
            setBlockedGroupUsers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            })
          );
        }
      },
    }),

    // Get Single User Details (for the detail page with eSIM bundles)
    getUserDetails: builder.query({
      query: (id) => `/admin/users/${id}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleUser(result?.data?.data || {}));
        } catch (error) {
          dispatch(setSingleUser({}));
        }
      },
    }),

    // Get Active Group Members (when clicking eye icon on a group)
    getGroupMembers: builder.query({
      query: ({ groupId, current_page = 1, per_page = 10 }) =>
        `/admin/users/groups/${groupId}/members?page=${current_page}&per_page=${per_page}`,
    }),

    // Get User eSIM Bundles (for detail page)
    getUserEsimBundles: builder.query({
      query: ({ userId, current_page = 1, per_page = 10 }) =>
        `/admin/users/${userId}/esim-bundles?page=${current_page}&per_page=${per_page}`,
    }),
  }),
});

export const {
  useGetActiveRegularUsersQuery,
  useGetActiveGroupUsersQuery,
  useGetBlockedRegularUsersQuery,
  useGetBlockedGroupUsersQuery,
  useGetUserDetailsQuery,
  useGetGroupMembersQuery,
  useGetUserEsimBundlesQuery,
} = usersApi;
