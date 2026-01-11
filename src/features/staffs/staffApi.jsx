import { apiSlice } from "../api/apiSlice";
import {
  setStaff,
  setSingleStaff,
  addNewStaff,
  updateStaff,
  blockStaff,
  unblockStaff,
  deleteStaff,
} from "./staffSlice";

const staffApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Staff
    getStaff: builder.query({
      query: ({ current_page = 1, per_page = 10, search = "" }) => {
        let url = `/admin/staff-users?page=${current_page}&per_page=${per_page}`;
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
            setStaff({
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
            setStaff({
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

    // Get Single Staff
    getSingleStaff: builder.query({
      query: (id) => `/admin/staff-users/${id}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleStaff(result?.data?.data || {}));
        } catch (error) {
          dispatch(setSingleStaff({}));
        }
      },
    }),

    // Add Staff
    addStaff: builder.mutation({
      query: (data) => ({
        url: "/admin/staff-users",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(addNewStaff(result?.data?.data || arg));
        } catch (error) {
          console.error("Add staff failed:", error);
        }
      },
    }),

    // Update Staff
    updateStaff: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/staff-users/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            updateStaff({
              staff_id: id,
              data: result?.data?.data || data,
            })
          );
        } catch (error) {
          console.error("Update staff failed:", error);
        }
      },
    }),

    // Change Staff Status (Block/Unblock)
    changeStaffStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/staff-users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted({ id, status, staffData }, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          if (status === "blocked") {
            dispatch(blockStaff({ staff_id: id, staffData }));
          } else if (status === "active") {
            dispatch(unblockStaff({ staff_id: id }));
          }
        } catch (error) {
          console.error("Change staff status failed:", error);
        }
      },
    }),

    // Delete Staff
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/admin/staff-users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(deleteStaff(id));
        } catch (error) {
          console.error("Delete staff failed:", error);
        }
      },
    }),
  }),
});

export const {
  useGetStaffQuery,
  useGetSingleStaffQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useChangeStaffStatusMutation,
  useDeleteStaffMutation,
} = staffApi;
