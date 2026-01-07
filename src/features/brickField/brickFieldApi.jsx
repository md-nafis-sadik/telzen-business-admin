import { apiSlice } from "../api/apiSlice";
import { 
  setBrickFieldList, 
  setSelectedBrickField,
  addBrickFieldToList,
  updateBrickFieldInList,
  removeBrickFieldFromList,
} from "./brickFieldSlice";

const brickFieldApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrickField: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        division = "",
        district = "",
        sub_district = "",
        search = "",
        _filterChangeId,
      }) => {
        let url = `/admin/brick-field?page=${current_page}&per_page=${per_page}`;

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        if (division) {
          url += `&division=${encodeURIComponent(division)}`;
        }
        if (district) {
          url += `&district=${encodeURIComponent(district)}`;
        }
        if (sub_district) {
          url += `&sub_district=${encodeURIComponent(sub_district)}`;
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
            search: arg.search || "",
            filter: {
              division: arg.division || "",
              district: arg.district || "",
              sub_district: arg.sub_district || "",
            },
          };

          dispatch(setBrickFieldList(formattedData));
        } catch (error) {
          dispatch(
            setBrickFieldList({
              data: [],
              meta: {
                total: 0,
                page: 1,
                per_page: arg.per_page || 10,
                last_page: 0,
              },
              search: arg.search || "",
              filter: {
                division: arg.division || "",
                district: arg.district || "",
                sub_district: arg.sub_district || "",
              },
            })
          );
          return { error };
        }
      },
    }),

    getBrickFieldDetails: builder.query({
      query: ({ brick_field_id }) => `/admin/brick-field/${brick_field_id}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSelectedBrickField(result?.data?.data));
        } catch (error) {
          return { error };
        }
      },
    }),

    addBrickField: builder.mutation({
      query: (data) => ({
        url: `/admin/brick-field`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(addBrickFieldToList(response.data));
          }
        } catch (error) {
          // Error handled in component
        }
      },
    }),

    updateBrickField: builder.mutation({
      query: ({ data, brick_field_id }) => ({
        url: `/admin/brick-field/${brick_field_id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(updateBrickFieldInList(response.data));
          }
        } catch (error) {
          // Error handled in component
        }
      },
    }),

    deleteBrickField: builder.mutation({
      query: ({ brick_field_id }) => ({
        url: `/admin/brick-field/${brick_field_id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success) {
            dispatch(removeBrickFieldFromList(arg.brick_field_id));
          }
        } catch (error) {
          // Error handled in component
        }
      },
    }),
  }),
});

export const {
  useGetBrickFieldQuery,
  useGetBrickFieldDetailsQuery,
  useAddBrickFieldMutation,
  useUpdateBrickFieldMutation,
  useDeleteBrickFieldMutation,
} = brickFieldApi;
