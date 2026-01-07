import { apiSlice } from "../api/apiSlice";

const sharedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    qrPdfDownload: builder.mutation({
      query: () => ({
        url: "/masjid/qr_code",
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
        responseHandler: (response) => response.blob(),
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const blob = result.data; 
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "qr_code.pdf";
          link.click();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Failed to download PDF:", error);
        }
      },
    }),
  }),
});

export const { useQrPdfDownloadMutation } = sharedApi;
