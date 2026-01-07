import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setDivisionsLoading,
  setDivisions,
  setDivisionsError,
  setDistrictsLoading,
  setDistricts,
  setDistrictsError,
  setUpazilasLoading,
  setUpazilas,
  setUpazilasError,
} from "./locationSlice";

const locationBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_EASYTRUCK_URL,
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const locationApiSlice = createApi({
  reducerPath: "locationApi",
  baseQuery: locationBaseQuery,
  endpoints: (builder) => ({}),
});

const locationApi = locationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: () => "/divisions",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setDivisionsLoading(true));
        try {
          const result = await queryFulfilled;
          const divisions = result?.data?.data || [];
          dispatch(setDivisions(divisions));
        } catch (error) {
          dispatch(
            setDivisionsError(
              error?.error?.data?.message || "Failed to fetch divisions"
            )
          );
        }
      },
    }),

    getDistricts: builder.query({
      query: ({ divisionId }) => {
        const divisions = Array.isArray(divisionId) ? divisionId.join(',') : divisionId;
        return `/filter/districts?division_id=${divisions}`;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setDistrictsLoading(true));
        try {
          const result = await queryFulfilled;
          const districts = result?.data?.data || [];
          dispatch(setDistricts(districts));
        } catch (error) {
          dispatch(
            setDistrictsError(
              error?.error?.data?.message || "Failed to fetch districts"
            )
          );
        }
      },
    }),

    getUpazilas: builder.query({
      query: ({ districtId }) => {
        const districts = Array.isArray(districtId) ? districtId.join(',') : districtId;
        return `/filter/upazilas?district_id=${districts}`;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setUpazilasLoading(true));
        try {
          const result = await queryFulfilled;
          const upazilas = result?.data?.data || [];
          dispatch(setUpazilas(upazilas));
        } catch (error) {
          dispatch(
            setUpazilasError(
              error?.error?.data?.message || "Failed to fetch upazilas"
            )
          );
        }
      },
    }),
  }),
});

export const {
  useGetDivisionsQuery,
  useGetDistrictsQuery,
  useGetUpazilasQuery,
} = locationApi;

export { locationApiSlice };
