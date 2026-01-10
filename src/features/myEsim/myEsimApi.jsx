import { apiSlice } from "../api/apiSlice";
import {
  setRegularMyEsim,
  setGroupMyEsim,
  setSingleMyEsim,
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
  useGetSingleMyEsimQuery,
} = myEsimApi;
