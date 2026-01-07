import { apiSlice } from "../api/apiSlice";
import { 
  setBrickStockList,
  updateBrickStockInList,
  updateBrickStockFromHistory,
} from "./brickStockSlice";

const brickStockApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrickStock: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        search = "",
      }) => {
        let url = `/admin/brick-stock?page=${current_page}&per_page=${per_page}`;

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          const formattedData = {
            data: responseData?.data || [],
            meta: responseData?.meta,
            search: arg.search,
          };

          dispatch(setBrickStockList(formattedData));
        } catch (error) {
          dispatch(
            setBrickStockList({
              data: [],
              meta: {
                total: 0,
                page: 1,
                per_page: arg.per_page || 10,
                last_page: 0,
              },
              search: arg.search,
            })
          );
          return { error };
        }
      },
    }),

    getBrickStockDetails: builder.query({
      query: ({ brick_id }) => `/admin/brick-stock/${brick_id}`,
    }),

    updateBrickStock: builder.mutation({
      query: (body) => ({
        url: `/admin/brick-stock`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(updateBrickStockInList(response.data));
          }
        } catch (error) {
        }
      },
    }),

    getBrickStockHistory: builder.query({
      query: ({ brick_id }) => `/admin/brick-stock-history/${brick_id}`,
    }),

    updateBrickStockHistory: builder.mutation({
      query: (body) => ({
        url: `/admin/brick-stock-history`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            const brickType = Object.keys(response.data)[0];
            const historyData = response.data[brickType];
            
            dispatch(updateBrickStockFromHistory({
              brick_id: arg.brick_id, 
              brick_type: brickType,   
              stock: historyData.stock, 
            }));
          }
        } catch (error) {
        }
      },
    }),
  }),
});

export const {
  useGetBrickStockQuery,
  useGetBrickStockDetailsQuery,
  useUpdateBrickStockMutation,
  useGetBrickStockHistoryQuery,
  useUpdateBrickStockHistoryMutation,
} = brickStockApi;

export default brickStockApi;