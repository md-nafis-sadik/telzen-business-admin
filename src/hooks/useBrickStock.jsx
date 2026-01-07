import { useSelector, useDispatch } from "react-redux";
import {
  useGetBrickStockQuery,
  useUpdateBrickStockMutation,
  useUpdateBrickStockHistoryMutation,
} from "@/features/brickStock/brickStockApi";
import {
  changeSearch,
  setSelectedBrickStock,
  setPageData,
  setLoading,
} from "@/features/brickStock/brickStockSlice";
import { errorNotify } from "@/services";
import { useDebounce } from "./useDebounce";

export const useBrickStock = () => {
  const {
    dataLists,
    pageData,
    search,
    selectedBrickStock,
    data,
    filterChangeId,
    isLoading,
  } = useSelector((state) => state.brickStock);

  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(search, 500);

  const { currentPage, pageSize } = pageData;
  const cacheKey = `page${currentPage}_${debouncedSearch}`;
  const cachedData = data[cacheKey];

  const { isFetching, isError, error, refetch } = useGetBrickStockQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const [updateBrickStock] = useUpdateBrickStockMutation();
  const [updateBrickStockHistory] = useUpdateBrickStockHistoryMutation();

  const handlePageChange = (page) => {
    const updates = { currentPage: page.current_page };
    if (page.per_page && page.per_page !== pageData.pageSize) {
      updates.pageSize = page.per_page;
    }
    dispatch(setPageData({ ...pageData, ...updates }));
  };

  const handleSearchChange = (searchTerm) => {
    dispatch(changeSearch(searchTerm));
    dispatch(setPageData({ ...pageData, currentPage: 1 }));
  };

  const handleUpdateStock = async (stockData) => {
    dispatch(setLoading(true));
    try {
      const res = await updateBrickStock(stockData).unwrap();
      return res;
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to update stock");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateHistory = async (historyData) => {
    dispatch(setLoading(true));
    try {
      const res = await updateBrickStockHistory(historyData).unwrap();
      // successNotify(res?.message || "Stock history updated successfully");
      return res;
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to update stock history");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    isFetching,
    isError,
    error,
    brickStocks: cachedData || dataLists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: pageData.totalPages,
    total_items: pageData.totalItems,
    search,
    selectedBrickStock,
    isLoading,
    updatePage: handlePageChange,
    handleSearchChange,
    handleUpdateStock,
    handleUpdateHistory,
    dispatch,
    setSelectedBrickStock,
    refetch,
  };
};
