import { apiSlice } from "../api/apiSlice";
import {
  setRegularMyEsim,
  setGroupMyEsim,
  setGroupDetailsData,
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
          const apiMeta = responseData?.meta;

          dispatch(
            setRegularMyEsim({
              data: responseData?.data || [],
              meta: {
                current_page: apiMeta?.current_page || arg.current_page || 1,
                page_size: apiMeta?.page_size || arg.limit || 10,
                total_items: apiMeta?.total_items || 0,
                total_pages: apiMeta?.total_pages || 1,
              },
              search: undefined, // Don't update search from API response
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve user's search input
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
          const apiMeta = responseData?.meta;

          dispatch(
            setGroupMyEsim({
              data: responseData?.data || [],
              meta: {
                current_page: apiMeta?.current_page || arg.current_page || 1,
                page_size: apiMeta?.page_size || arg.limit || 10,
                total_items: apiMeta?.total_items || 0,
                total_pages: apiMeta?.total_pages || 1,
              },
              search: undefined, // Don't update search from API response
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve user's search input
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
          const apiMeta = responseData?.meta;

          dispatch(
            setGroupDetailsData({
              data: responseData?.data || [],
              meta: {
                current_page: apiMeta?.current_page || arg.current_page || 1,
                page_size: apiMeta?.page_size || arg.limit || 10,
                total_items: apiMeta?.total_items || 0,
                total_pages: apiMeta?.total_pages || 1,
              },
              search: undefined, // Don't update search from API response
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve user's search input
        }
      },
    }),

    getSingleMyEsim: builder.query({
      query: ({ myEsim_id }) => `/esim/${myEsim_id}`,
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleMyEsim(result?.data?.data));
        } catch (error) {
          dispatch(setSingleMyEsim({}));
        }
      },
    }),
  }),
});

export const {
  useGetRegularMyEsimQuery,
  useGetGroupMyEsimQuery,
  useGetGroupEsimDetailsQuery,
  useGetSingleMyEsimQuery,
} = myEsimApi;