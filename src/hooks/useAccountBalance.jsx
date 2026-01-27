import {
  useGetAccountBalanceQuery,
  useGetAccountBalanceSummaryQuery,
} from "@/features/accountBalance/accountBalanceApi";
import {
  updateAccountBalancePage,
  updateAccountBalancePageSize,
} from "@/features/accountBalance/accountBalanceSlice";
import { formatDate } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";

const generateCacheKey = (page) => {
  return `${page}`;
};

export const useAccountBalance = () => {
  const dispatch = useDispatch();
  const { accountBalanceData, summaryData } = useSelector(
    (state) => state.accountBalance,
  );

  const { lists, meta, cache, filterChangeId } = accountBalanceData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const cacheKey = generateCacheKey(currentPage);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetAccountBalanceQuery(
    {
      current_page: currentPage,
      limit: pageSize,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
      skip: false,
    },
  );

  const { isFetching: isSummaryFetching, isError: isSummaryError } =
    useGetAccountBalanceSummaryQuery();

  const displayData = cachedData?.data || lists || [];

  const handlePageChange = (page) => {
    dispatch(updateAccountBalancePage(page.current_page || page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateAccountBalancePageSize(newPageSize));
    }
  };

  const summaryCards = [
    {
      title: "Package sold",
      number: summaryData.packageSold,
      bgColor: "bg-[#CDFFE9]",
    },
    {
      title: "Selling Value",
      number: `$${summaryData.sellingValue.toLocaleString()}`,
      bgColor: "bg-[#FFE5CC]",
    },
    {
      title: "Package Fee",
      number: `$${summaryData.packageFee.toLocaleString()}`,
      bgColor: "bg-[#C9ECFF]",
    },
    {
      title: "Gross Revenue",
      number: `$${summaryData.grossRevenue.toLocaleString()}`,
      bgColor: "bg-[#FFE0DF]",
    },
  ];

  const handleExport = () => {
    if (!displayData || displayData.length === 0) {
      alert("No data to export!");
      return;
    }

    const exportData = displayData.map((item, index) => ({
      SL: (currentPage - 1) * pageSize + index + 1,
      Date: formatDate(item.created_at),
      Package: item.package?.name || "-",
      Customer: item.customer?.name || "-",
      "Group Name": item.group?.name || "-",
      "Customer Email": item.customer?.email || "-",
      "Customer Phone": item.customer_phone || "-",
      Amount: `$${item.payment_amount || 0}`,
      Revenue: `$${item.revenue || 0}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Account Balance");
    XLSX.writeFile(workbook, "account_balance_export.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  const hasData = displayData && displayData.length > 0;

  return {
    dataList: isError ? [] : displayData,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    summaryCards,
    isFetching: isFetching || isSummaryFetching,
    isLoading: false,
    isError: isError || isSummaryError,
    error,
    handlePageChange,
    handleExport,
    handlePrint,
    hasData,
  };
};
