import { apiSlice } from "../api/apiSlice";
import {
  setRegularMyEsim,
  setGroupMyEsim,
  setSingleMyEsim,
} from "./myEsimSlice";

const myEsimApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegularMyEsim: builder.query({
      query: ({ current_page = 1, limit = 10, search = "" }) => {
        let url = `/esim?type=regular&page=${current_page}&limit=${limit}`;

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
                current_page: arg.current_page || 1,
                page_size: arg.limit || 10,
                total_items: 0,
                total_pages: 0,
              },
              search: arg.search || "",
            }),
          );
        } catch (error) {
          console.error("Regular MyEsim fetch error:", error);
          dispatch(
            setRegularMyEsim({
              data: [],
              meta: {
                current_page: arg.current_page || 1,
                page_size: arg.limit || 10,
                total_items: 0,
                total_pages: 0,
              },
              search: arg.search || "",
            }),
          );
        }
      },
    }),

    getGroupMyEsim: builder.query({
      query: ({ current_page = 1, limit = 10, search = "" }) => {
        let url = `/esim/purchase-group?page=${current_page}&limit=${limit}`;

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
                current_page: arg.current_page || 1,
                page_size: arg.limit || 10,
                total_items: 0,
                total_pages: 0,
              },
              search: arg.search || "",
            }),
          );
        } catch (error) {
          console.error("Group MyEsim fetch error:", error);
          dispatch(
            setGroupMyEsim({
              data: [],
              meta: {
                current_page: arg.current_page || 1,
                page_size: arg.limit || 10,
                total_items: 0,
                total_pages: 0,
              },
              search: arg.search || "",
            }),
          );
        }
      },
    }),

    getGroupEsimDetails: builder.query({
      query: ({ group_id, current_page = 1, limit = 10, search = "" }) => {
        let url = `/esim?type=group&group_id=${group_id}&page=${current_page}&limit=${limit}`;

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
                current_page: arg.current_page || 1,
                page_size: arg.limit || 10,
                total_items: 0,
                total_pages: 0,
              },
              search: arg.search || "",
            }),
          );
        } catch (error) {
          console.error("Group eSIM details fetch error:", error);
          dispatch(
            setGroupMyEsim({
              data: [],
              meta: {
                current_page: arg.current_page || 1,
                page_size: arg.limit || 10,
                total_items: 0,
                total_pages: 0,
              },
              search: arg.search || "",
            }),
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
  }),
});

export const {
  useGetRegularMyEsimQuery,
  useGetGroupMyEsimQuery,
  useGetGroupEsimDetailsQuery,
  useGetSingleMyEsimQuery,
} = myEsimApi;
