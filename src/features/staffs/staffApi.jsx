import { apiSlice } from "../api/apiSlice";
import { setStaffDetails, setStaffOrderData } from "./staffDetailsSlice";
import {
  addNewStaff,
  blockStaff,
  setActiveStaff,
  setBlockedStaff,
  setSingleStaff,
  unblockStaff,
  updateStaff,
} from "./staffSlice";

const staffApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveStaff: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/staff-users/active?page=${current_page}&per_page=${per_page}`;

        if (filter) {
          if (filter.division && filter.division.toLowerCase() !== "all") {
            url += `&division=${filter.division.toLowerCase()}`;
          }
          if (filter.district && filter.district.toLowerCase() !== "all") {
            url += `&district=${filter.district.toLowerCase()}`;
          }
          if (filter.upazila && filter.upazila.toLowerCase() !== "all") {
            url += `&sub_district=${filter.upazila.toLowerCase()}`;
          }
        }

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
            setActiveStaff({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        } catch (error) {
          dispatch(
            setActiveStaff({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        }
      },
    }),

    getBlockedStaff: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/staff-users/blocked?page=${current_page}&per_page=${per_page}`;

        if (filter) {
          if (filter.division && filter.division.toLowerCase() !== "all") {
            url += `&division=${filter.division.toLowerCase()}`;
          }
          if (filter.district && filter.district.toLowerCase() !== "all") {
            url += `&district=${filter.district.toLowerCase()}`;
          }
          if (filter.upazila && filter.upazila.toLowerCase() !== "all") {
            url += `&sub_district=${filter.upazila.toLowerCase()}`;
          }
        }

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
            setBlockedStaff({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        } catch (error) {
          dispatch(
            setBlockedStaff({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        }
      },
    }),

    getSingleStaff: builder.query({
      query: ({ staff_id }) => `/admin/staff-user/${staff_id}`,
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleStaff(result?.data?.data));
        } catch (error) {
          dispatch(setSingleStaff({}));
        }
      },
    }),

    addStaff: builder.mutation({
      query: (data) => ({
        url: `/admin/staff-user`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(addNewStaff(response.data));
          }
        } catch (error) {
        }
      },
    }),

    updateStaff: builder.mutation({
      query: ({ data, staff_id }) => ({
        url: `/admin/staff-user/${staff_id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(
              updateStaff({
                staff_id: arg.staff_id,
                data: response.data,
              })
            );
          }
        } catch (error) {
        }
      },
    }),

    changeStaffStatus: builder.mutation({
      query: (data) => ({
        url: `/admin/staff-user-status`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;

          if (response?.success && response?.data) {
            const staffData = response.data;

            const fixedStaffData = {
              ...staffData,
              avatar: staffData.avatar?.startsWith("undefined/")
                ? staffData.avatar.replace("undefined/", "")
                : staffData.avatar,
            };

            if (fixedStaffData.status === "blocked") {
              dispatch(
                blockStaff({
                  staff_id: arg._id || fixedStaffData._id,
                  staffData: fixedStaffData,
                })
              );
            } else if (fixedStaffData.status === "active") {
              dispatch(
                unblockStaff({
                  staff_id: arg._id || fixedStaffData._id,
                  staffData: fixedStaffData,
                })
              );
            }
          }
        } catch (error) {
          console.error("Change staff status error:", error);
        }
      },
    }),

    blockStaff: builder.mutation({
      query: ({ staff_id }) => ({
        url: `/admin/block_staff/${staff_id}`,
        method: "GET",
      }),
      async onQueryStarted({ staff_id }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            const staffData = response.data;

            if (staffData.avatar && staffData.avatar.startsWith("undefined/")) {
              staffData.avatar = staffData.avatar.replace("undefined/", "");
            }

            dispatch(
              blockStaff({
                staff_id,
                staffData: staffData,
              })
            );
          }
        } catch (error) {
          console.error("Block staff error:", error);
          return { error };
        }
      },
    }),

    unblockStaff: builder.mutation({
      query: ({ staff_id }) => ({
        url: `/admin/unblock_staff/${staff_id}`,
        method: "GET",
      }),
      async onQueryStarted({ staff_id }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            const staffData = response.data;

            if (staffData.avatar && staffData.avatar.startsWith("undefined/")) {
              staffData.avatar = staffData.avatar.replace("undefined/", "");
            }

            dispatch(
              unblockStaff({
                staff_id,
                staffData: staffData,
              })
            );
          }
        } catch (error) {
          console.error("Unblock staff error:", error);
          return { error };
        }
      },
    }),

    getStaffDetails: builder.query({
      query: ({ staff_id }) => ({
        url: `/admin/staff-user/${staff_id}`,
        method: "GET",
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const response = result?.data;

          dispatch(
            setStaffDetails(response?.data || {})
          );
        } catch (error) {
          dispatch(
            setStaffDetails({})
          );
        }
      },
    }),
    reassignStaff: builder.mutation({
      query: ({ staff_id, data }) => ({
        url: `/admin/reassign-staffs/${staff_id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getStaffOrderDetails: builder.query({
      query: ({ staff_id, current_page = 1, per_page = 10 }) => ({
        url: `/admin/staff-orders-table/${staff_id}?page=${current_page}&per_page=${per_page}`,
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setStaffOrderData({
              data: result?.data?.data || [],
              meta: result?.data?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 1,
              },
            })
          );
        } catch (error) {
          dispatch(
            setStaffOrderData({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 1,
              },
            })
          );
          return { error };
        }
      },
    }),

    payStaffCommission: builder.mutation({
      query: ({ staff_id, amount }) => ({
        url: `/admin/staff-payout`,
        method: "POST",
        body: { staff_id, amount },
      }),
    }),

    getStaffList: builder.query({
      query: () => `/admin/staff-list`,
      transformResponse: (response) => {
        return (
          response?.data?.map((staff) => ({
            id: staff._id,
            label: staff.full_name,
            value: staff._id,
          })) || []
        );
      },
    }),

    getReassignStaffList: builder.query({
      query: ({ staff_id }) => `/admin/reassign-staffs/${staff_id}`,
      transformResponse: (response) => {
        return (
          response?.data?.map((staff) => ({
            id: staff._id,
            label: staff.full_name,
            value: staff._id,
          })) || []
        );
      },
    }),
  }),
});

export const {
  useGetActiveStaffQuery,
  useGetBlockedStaffQuery,
  useGetSingleStaffQuery,
  useGetStaffDetailsQuery,
  useGetStaffOrderDetailsQuery,
  useGetStaffListQuery,
  useGetReassignStaffListQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useChangeStaffStatusMutation,
  useReassignStaffMutation,
  useBlockStaffMutation,
  useUnblockStaffMutation,
  usePayStaffCommissionMutation,
} = staffApi;
