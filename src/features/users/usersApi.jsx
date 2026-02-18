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
      providesTags: ["Customer"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;
          const apiMeta = responseData?.meta;

          dispatch(
            setActiveRegularUsers({
              data: responseData?.data || [],
              meta: {
                page: apiMeta?.current_page || arg.current_page || 1,
                per_page: apiMeta?.page_size || arg.limit || 10,
                total: apiMeta?.total_items || 0,
                last_page: apiMeta?.total_pages || 1,
              },
              search: undefined, // Don't update search from API response
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve user's search input
        }
      },
    }),

    // Get Active Group Users
    getGroupUsers: builder.query({
      query: ({ current_page = 1, limit = 10, search = "" }) => {
        let url = `/group?page=${current_page}&limit=${limit}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },
      providesTags: ["CustomerGroup"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;
          const apiMeta = responseData?.meta;

          dispatch(
            setGroupUsers({
              data: responseData?.data || [],
              meta: {
                page: apiMeta?.current_page || arg.current_page || 1,
                per_page: apiMeta?.page_size || arg.limit || 10,
                total: apiMeta?.total_items || 0,
                last_page: apiMeta?.total_pages || 1,
              },
              search: undefined, // Don't update search from API response
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve user's search input
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
      providesTags: ["Customer"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;
          const apiMeta = responseData?.meta;

          dispatch(
            setBlockedRegularUsers({
              data: responseData?.data || [],
              meta: {
                page: apiMeta?.current_page || arg.current_page || 1,
                per_page: apiMeta?.page_size || arg.limit || 10,
                total: apiMeta?.total_items || 0,
                last_page: apiMeta?.total_pages || 1,
              },
              search: undefined, // Don't update search from API response
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve user's search input
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
      providesTags: (result, error, arg) => [
        "Customer",
        { type: "GroupMembers", id: arg.groupId },
      ],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;
          const apiMeta = responseData?.meta;

          dispatch(
            setGroupMembers({
              data: responseData?.data || [],
              meta: {
                page: apiMeta?.current_page || arg.current_page || 1,
                per_page: apiMeta?.page_size || arg.limit || 10,
                total: apiMeta?.total_items || 0,
                last_page: apiMeta?.total_pages || 1,
              },
              search: undefined, // Don't update search from API response
              groupId: arg.groupId, // Pass groupId for cache key
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve user's search input
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
          is_blocked,
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

    // Get Single Group
    getSingleGroup: builder.query({
      query: (group_id) => `/group/single?group_id=${group_id}`,
      providesTags: (result, error, group_id) => [{ type: "Group", id: group_id }],
    }),

    // Create Group
    createGroup: builder.mutation({
      query: (data) => ({
        url: `/group/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomerGroup"],
    }),

    // Update Group
    updateGroup: builder.mutation({
      query: ({ group_id, ...data }) => ({
        url: `/group/update?group_id=${group_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { group_id }) => [
        "CustomerGroup",
        { type: "Group", id: group_id },
      ],
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
  useGetSingleGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
} = usersApi;
