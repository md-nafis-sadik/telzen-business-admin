import { apiSlice } from "../api/apiSlice";
// import { setMyEsimDetails, setMyEsimOrderData } from "./myEsimDetailsSlice";
import {
  addNewMyEsim,
  blockMyEsim,
  setRegularMyEsim,
  setGroupMyEsim,
  setSingleMyEsim,
  unblockMyEsim,
  updateMyEsim,
} from "./myEsimSlice";

const myEsimApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegularMyEsim: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        search = "",
      }) => {
        let url = `/admin/staff-users/active?page=${current_page}&per_page=${per_page}`;


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
            setRegularMyEsim({
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
          console.error("Regular MyEsim fetch error:", error);
          // Clear data on error
          dispatch(
            setRegularMyEsim({
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

    getGroupMyEsim: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        search = "",
      }) => {
        let url = `/admin/staff-users/active?page=${current_page}&per_page=${per_page}`;

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
            setGroupMyEsim({
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
          console.error("Group MyEsim fetch error:", error);
          // Clear data on error
          dispatch(
            setGroupMyEsim({
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

    getSingleMyEsim: builder.query({
      query: ({ myEsim_id }) => `/admin/staff-user/${myEsim_id}`,
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleMyEsim(result?.data?.data));
        } catch (error) {
          dispatch(setSingleMyEsim({}));
        }
      },
    }),

    changeMyEsimStatus: builder.mutation({
      query: (data) => ({
        url: `/admin/myEsim-user-status`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;

          if (response?.success && response?.data) {
            const myEsimData = response.data;

            const fixedMyEsimData = {
              ...myEsimData,
              avatar: myEsimData.avatar?.startsWith("undefined/")
                ? myEsimData.avatar.replace("undefined/", "")
                : myEsimData.avatar,
            };

            if (fixedMyEsimData.status === "group") {
              dispatch(
                blockMyEsim({
                  myEsim_id: arg._id || fixedMyEsimData._id,
                  myEsimData: fixedMyEsimData,
                })
              );
            } else if (fixedMyEsimData.status === "regular") {
              dispatch(
                unblockMyEsim({
                  myEsim_id: arg._id || fixedMyEsimData._id,
                  myEsimData: fixedMyEsimData,
                })
              );
            }
          }
        } catch (error) {
          console.error("Change myEsim status error:", error);
        }
      },
    }),

    blockMyEsim: builder.mutation({
      query: ({ myEsim_id }) => ({
        url: `/admin/block_myEsim/${myEsim_id}`,
        method: "GET",
      }),
      async onQueryStarted({ myEsim_id }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            const myEsimData = response.data;

            if (myEsimData.avatar && myEsimData.avatar.startsWith("undefined/")) {
              myEsimData.avatar = myEsimData.avatar.replace("undefined/", "");
            }

            dispatch(
              blockMyEsim({
                myEsim_id,
                myEsimData: myEsimData,
              })
            );
          }
        } catch (error) {
          console.error("Block myEsim error:", error);
          return { error };
        }
      },
    }),

    unblockMyEsim: builder.mutation({
      query: ({ myEsim_id }) => ({
        url: `/admin/unblock_myEsim/${myEsim_id}`,
        method: "GET",
      }),
      async onQueryStarted({ myEsim_id }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            const myEsimData = response.data;

            if (myEsimData.avatar && myEsimData.avatar.startsWith("undefined/")) {
              myEsimData.avatar = myEsimData.avatar.replace("undefined/", "");
            }

            dispatch(
              unblockMyEsim({
                myEsim_id,
                myEsimData: myEsimData,
              })
            );
          }
        } catch (error) {
          console.error("Unblock myEsim error:", error);
          return { error };
        }
      },
    }),

    // getMyEsimDetails: builder.query({
    //   query: ({ myEsim_id }) => ({
    //     url: `/admin/myEsim-user/${myEsim_id}`,
    //     method: "GET",
    //   }),

    //   async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //       const response = result?.data;

    //       dispatch(
    //         setMyEsimDetails(response?.data || {})
    //       );
    //     } catch (error) {
    //       dispatch(
    //         setMyEsimDetails({})
    //       );
    //     }
    //   },
    // }),
    reassignMyEsim: builder.mutation({
      query: ({ myEsim_id, data }) => ({
        url: `/admin/reassign-myEsims/${myEsim_id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getMyEsimOrderDetails: builder.query({
      query: ({ myEsim_id, current_page = 1, per_page = 10 }) => ({
        url: `/admin/myEsim-orders-table/${myEsim_id}?page=${current_page}&per_page=${per_page}`,
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setMyEsimOrderData({
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
            setMyEsimOrderData({
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

    payMyEsimCommission: builder.mutation({
      query: ({ myEsim_id, amount }) => ({
        url: `/admin/myEsim-payout`,
        method: "POST",
        body: { myEsim_id, amount },
      }),
    }),

    getMyEsimList: builder.query({
      query: () => `/admin/myEsim-list`,
      transformResponse: (response) => {
        return (
          response?.data?.map((myEsim) => ({
            id: myEsim._id,
            label: myEsim.full_name,
            value: myEsim._id,
          })) || []
        );
      },
    }),

    getReassignMyEsimList: builder.query({
      query: ({ myEsim_id }) => `/admin/reassign-myEsims/${myEsim_id}`,
      transformResponse: (response) => {
        return (
          response?.data?.map((myEsim) => ({
            id: myEsim._id,
            label: myEsim.full_name,
            value: myEsim._id,
          })) || []
        );
      },
    }),
  }),
});

export const {
  useGetRegularMyEsimQuery,
  useGetGroupMyEsimQuery,
  useGetSingleMyEsimQuery,
  useGetMyEsimDetailsQuery,
  useGetMyEsimOrderDetailsQuery,
  useGetMyEsimListQuery,
  useGetReassignMyEsimListQuery,
  useAddMyEsimMutation,
  useUpdateMyEsimMutation,
  useChangeMyEsimStatusMutation,
  useReassignMyEsimMutation,
  useBlockMyEsimMutation,
  useUnblockMyEsimMutation,
  usePayMyEsimCommissionMutation,
} = myEsimApi;
