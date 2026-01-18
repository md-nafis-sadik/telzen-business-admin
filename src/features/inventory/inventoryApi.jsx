import { apiSlice } from "../api/apiSlice";

export const inventoryApi = apiSlice.injectEndpoints({
  tagTypes: ["Inventory", "Package"],
  endpoints: (builder) => ({
    // Get regions with pagination and search
    getRegions: builder.query({
      query: ({ page = 1, limit = 9999999, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search.trim()) {
          params.append("search", search.trim());
        }

        return `/region?${params.toString()}`;
      },
      providesTags: ["Inventory"],
    }),

    // Get countries with pagination and search
    getCountries: builder.query({
      query: ({ page = 1, limit = 9999999, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search.trim()) {
          params.append("search", search.trim());
        }

        return `/country?${params.toString()}`;
      },
      providesTags: ["Inventory"],
    }),

    // Get packages for a region or country
    getPackages: builder.query({
      query: ({ region_id, country_id, page = 1, limit = 9999999 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (region_id) {
          params.append("region_id", region_id);
        }

        if (country_id) {
          params.append("country_id", country_id);
        }

        return `/package?${params.toString()}`;
      },
      providesTags: ["Package"],
    }),

    // Get single package details
    getSinglePackage: builder.query({
      query: ({ country_id, region_id, package_id }) => {
        const params = new URLSearchParams({
          package_id,
        });

        if (country_id) {
          params.append("country_id", country_id);
        }

        if (region_id) {
          params.append("region_id", region_id);
        }

        return `/package/single?${params.toString()}`;
      },
      providesTags: ["Package"],
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetCountriesQuery,
  useGetPackagesQuery,
  useGetSinglePackageQuery,
} = inventoryApi;
