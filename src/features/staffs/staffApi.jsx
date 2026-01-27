import { apiSlice } from "../api/apiSlice";
import {
  addNewStaff,
  blockStaff,
  deleteStaff,
  setSingleStaff,
  setStaff,
  unblockStaff,
  updateStaff,
} from "./staffSlice";

const staffApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Staff
    getStaff: builder.query({
      query: ({ current_page = 1, limit = 10, search = "" }) => {
        let url = `/staff?page=${current_page}&limit=${limit}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;
          const apiMeta = responseData?.meta;

          dispatch(
            setStaff({
              data: responseData?.data || [],
              meta: {
                page: apiMeta?.current_page || arg.current_page || 1,
                limit: apiMeta?.page_size || arg.limit || 10,
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

    // Get Single Staff
    getSingleStaff: builder.query({
      query: (id) => `/staff/single?staff_id=${id}`,
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
        url: "/staff/create",
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
        url: `staff/update?staff_id=${id}`,
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
            }),
          );
        } catch (error) {
          console.error("Update staff failed:", error);
        }
      },
    }),

    // Change Staff Status (Block/Unblock)
    changeStaffStatus: builder.mutation({
      query: ({ id, is_blocked }) => ({
        url: `staff/update?staff_id=${id}`,
        method: "PATCH",
        body: { is_blocked },
      }),
      async onQueryStarted(
        { id, is_blocked, staffData },
        { queryFulfilled, dispatch },
      ) {
        try {
          await queryFulfilled;
          if (is_blocked) {
            dispatch(blockStaff({ staff_id: id, staffData }));
          } else if (!is_blocked) {
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
        url: `staff/delete?staff_id=${id}`,
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