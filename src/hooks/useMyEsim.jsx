import {
  useGetRegularMyEsimQuery,
  useGetGroupMyEsimQuery,
} from "@/features/myEsim/myEsimApi";
import {
  updateRegularSearch,
  updateRegularPage,
  updateGroupSearch,
  updateGroupPage,
  openQrModal,
  openRemoveModal,
} from "@/features/myEsim/myEsimSlice";
import {
  errorNotify,
  formatInvoiceData,
  generateInvoicePDF,
  images,
} from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "./useDebounce";

export const useRegularMyEsims = () => {
  const { regularData } = useSelector(
    (state) => state.myEsim
  );

  const dispatch = useDispatch();

  const { lists, meta, search } = regularData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, isError, error } = useGetRegularMyEsimQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
    },
    {
      skip: false,
    }
  );

  const isTyping = search !== debouncedSearch;
  const displayData = data?.data || lists;

  const handlePageChange = (page) => {
    dispatch(updateRegularPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateRegularSearch(value));
    dispatch(updateRegularPage(1));
  };

  const handleOpenQrModal = (myEsim) => {
    dispatch(openQrModal(myEsim));
  };

  const handleOpenRemoveModal = (myEsim) => {
    dispatch(openRemoveModal(myEsim));
  };

  const handleDownloadInvoice = async ({ user, userDetails }) => {
    try {
      const invoiceData = formatInvoiceData(userDetails);

      const companyInfo = {
        name: "Kloud Apps LLC",
        address1: "254 Chapman Rd, Suite 101-B, Newark,",
        address2: "DE 19702",
        email: "support@telzen.net",
        businessName: "Business Name",
        businessEmail: "Business Email",
      };

      const result = await generateInvoicePDF(
        invoiceData,
        images,
        companyInfo,
        errorNotify
      );

      if (result.success) {
        console.log("Invoice generated successfully");
      }
    } catch (error) {
      console.error("Error in handleDownloadInvoice:", error);
      errorNotify("Failed to generate invoice");
    }
  };

  return {
    isFetching: isFetching || isTyping,
    isError,
    error,
    myEsims: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    regularSearch: search,
    updatePage: handlePageChange,
    isLoading: false,
    handleSearchChange,
    handleOpenQrModal,
    handleOpenRemoveModal,
    handleDownloadInvoice,
  };
};

export const useGroupMyEsims = () => {
  const { groupData } = useSelector((state) => state.myEsim);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);

  const { lists, meta, search } = groupData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, isError, error } = useGetGroupMyEsimQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
    },
    {
      skip: false,
    }
  );

  const isTyping = search !== debouncedSearch;
  const displayData = data?.data || lists;

  const handlePageChange = (page) => {
    dispatch(updateGroupPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateGroupSearch(value));
    dispatch(updateGroupPage(1));
  };

  const handleOpenQrModal = (myEsim) => {
    dispatch(openQrModal(myEsim));
  };

  const handleOpenRemoveModal = (myEsim) => {
    dispatch(openRemoveModal(myEsim));
  };

  const handleDownloadInvoice = async ({ user, userDetails }) => {
    try {
      const invoiceData = formatInvoiceData(userDetails);

      const companyInfo = {
        name: "Kloud Apps LLC",
        address1: "254 Chapman Rd, Suite 101-B, Newark,",
        address2: "DE 19702",
        email: "support@telzen.net",
        businessName: "Business Name",
        businessEmail: "Business Email",
      };

      const result = await generateInvoicePDF(
        invoiceData,
        images,
        companyInfo,
        errorNotify
      );

      if (result.success) {
        console.log("Invoice generated successfully");
      }
    } catch (error) {
      console.error("Error in handleDownloadInvoice:", error);
      errorNotify("Failed to generate invoice");
    }
  };

  return {
    isFetching: isFetching || isTyping,
    isError,
    error,
    myEsims: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    groupSearch: search,
    updatePage: handlePageChange,
    isLoading: false,
    showDeleteModal,
    handleSearchChange,
    handleOpenQrModal,
    handleOpenRemoveModal,
    handleDownloadInvoice,
  };
};
