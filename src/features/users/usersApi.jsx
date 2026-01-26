import { apiSlice } from "../api/apiSlice";
import {
  setActiveRegularUsers,
  setBlockedRegularUsers,
  setGroupMembers,
  setSingleUser,
  setGroupUsers,
} from "./usersSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Active Regular Users
    getActiveRegularUsers: builder.query({
      query: ({ current_page = 1, limit = 10, search = "" }) => {
        let url = `/customer?is_blocked=false&page=${current_page}&limit=${limit}`;
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
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
          );
        } catch (error) {
          dispatch(
            setActiveRegularUsers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
          );
        }
      },
    }),

    // Get Active Group Users
    getGroupUsers: builder.query({
      query: ({ current_page = 1, limit = 10, search = "" }) => {
        let url = `/customer/group?page=${current_page}&limit=${limit}`;
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
            setGroupUsers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
          );
        } catch (error) {
          dispatch(
            setGroupUsers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
          );
        }
      },
    }),

    // Get Blocked Regular Users
    getBlockedRegularUsers: builder.query({
      query: ({ current_page = 1, limit = 10, search = "" }) => {
        let url = `/customer?is_blocked=true&page=${current_page}&limit=${limit}`;
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
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
          );
        } catch (error) {
          dispatch(
            setBlockedRegularUsers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
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

    // Get Group Members (when clicking eye icon on a group)
    getGroupMembers: builder.query({
      query: ({ groupId, current_page = 1, limit = 10, search = "" }) => {
        let url = `/customer/by-group?group_id=${groupId}&page=${current_page}&limit=${limit}`;
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
            setGroupMembers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
          );
        } catch (error) {
          dispatch(
            setGroupMembers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
              search: arg.search || "",
            }),
          );
        }
      },
    }),

    // Get User eSIM Bundles (for detail page)
    getUserEsimBundles: builder.query({
      query: ({ userId, current_page = 1, limit = 10 }) =>
        `/admin/users/${userId}/esim-bundles?page=${current_page}&limit=${limit}`,
    }),

    // Block/Unblock User
    updateCustomerBlockStatus: builder.mutation({
      query: ({ customer_id, is_blocked }) => ({
        url: `/customer/update?customer_id=${customer_id}`,
        method: "PATCH",
        body: {
          data: {
            is_blocked,
          },
        },
      }),
    }),

    // Delete Group
    deleteCustomerGroup: builder.mutation({
      query: ({ group_id }) => ({
        url: `/customer/group/delete?group_id=${group_id}`,
        method: "DELETE",
      }),
    }),

    // Remove User from Group
    removeUserFromGroup: builder.mutation({
      query: ({ group_id, customer_id }) => ({
        url: `/customer/group/toggle?type=remove&group_id=${group_id}`,
        method: "PATCH",
        body: {
          customer_id,
        },
      }),
    }),
  }),
});

export const {
  useGetActiveRegularUsersQuery,
  useGetGroupUsersQuery,
  useGetBlockedRegularUsersQuery,
  useGetUserDetailsQuery,
  useGetGroupMembersQuery,
  useGetUserEsimBundlesQuery,
  useUpdateCustomerBlockStatusMutation,
  useDeleteCustomerGroupMutation,
  useRemoveUserFromGroupMutation,
} = usersApi;