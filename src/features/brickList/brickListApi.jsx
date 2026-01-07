import { apiSlice } from "../api/apiSlice";
import {
  setBrickList,
  updateBrickListStatus,
  setSingleBrick,
  addBrickToList,
  updateBrickInList,
  removeBrickFromList,
} from "./brickListSlice";

const brickListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrickList: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        search = "",
        _filterChangeId,
      }) => {
        return `/admin/brick?page=${current_page}&per_page=${per_page}${
          search ? `&search=${search}` : ""
        }`;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          const formattedData = {
            data: responseData?.data || [],
            meta: {
              current_page: responseData?.meta?.page,
              per_page: responseData?.meta?.per_page,
              total: responseData?.meta?.total,
              last_page: responseData?.meta?.last_page,
            },
            search: arg.search || "",
          };

          dispatch(setBrickList(formattedData));
        } catch (error) {
          dispatch(setBrickList({ data: [], meta: { last_page: 0 }, search: arg.search || "" }));
          return { error };
        }
      },
    }),

    toggleBrickStatus: builder.mutation({
      query: ({ _id, status }) => ({
        url: `/admin/toggle-brick-status`,
        method: "PATCH",
        body: { _id, status },
      }),

      async onQueryStarted({ _id, status }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const newStatus = result?.data?.data?.status;

          dispatch(
            updateBrickListStatus({
              brick_id: _id,
              status: newStatus,
            })
          );
        } catch (error) {
          return { error };
        }
      },
    }),

    getAllBrickFields: builder.query({
      query: () => `/admin/all-brick-fields`,
    }),

    addBrick: builder.mutation({
      query: (formData) => ({
        url: `/admin/brick`,
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(addBrickToList(response.data));
          }
        } catch (error) {
        }
      },
    }),

    getSingleBrick: builder.query({
      query: ({ brick_id }) => `/admin/brick/${brick_id}`,

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleBrick(result?.data?.data));
        } catch (error) {
          dispatch(setSingleBrick({}));
          return { error };
        }
      },
    }),

    updateBrick: builder.mutation({
      query: ({ formData, brick_id }) => ({
        url: `/admin/brick/${brick_id}`,
        method: "PATCH",
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(updateBrickInList(response.data));
          }
        } catch (error) {
        }
      },
    }),

    deleteBrick: builder.mutation({
      query: (brick_id) => ({
        url: `/admin/brick/${brick_id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success) {
            dispatch(removeBrickFromList(arg));
          }
        } catch (error) {
        }
      },
    }),
  }),
});

export const {
  useGetBrickListQuery,
  useToggleBrickStatusMutation,
  useGetAllBrickFieldsQuery,
  useAddBrickMutation,
  useUpdateBrickMutation,
  useGetSingleBrickQuery,
  useDeleteBrickMutation,
} = brickListApi;
