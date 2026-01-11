import { useDispatch, useSelector } from "react-redux";
import {
  useGetAccountBalanceQuery,
  useGetAccountBalanceSummaryQuery,
} from "@/features/accountBalance/accountBalanceApi";
import { updateAccountBalancePage } from "@/features/accountBalance/accountBalanceSlice";
import * as XLSX from "xlsx";
import moment from "moment";

export const useAccountBalance = () => {
  const dispatch = useDispatch();
  const { accountBalanceData, summaryData } = useSelector(
    (state) => state.accountBalance
  );

  const { lists, meta } = accountBalanceData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const { isFetching, isError, error } = useGetAccountBalanceQuery({
    current_page: currentPage,
    per_page: pageSize,
  });

  const {
    isFetching: isSummaryFetching,
    isError: isSummaryError,
  } = useGetAccountBalanceSummaryQuery();

  const handlePageChange = (page) => {
    dispatch(updateAccountBalancePage(page));
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
    if (!lists || lists.length === 0) {
      alert("No data to export!");
      return;
    }

    const exportData = lists.map((item, index) => ({
      SL: index + 1,
      Date: item.date ? moment(item.date).format("DD-MM-YYYY") : "-",
      Package: item.package || "-",
      Customer: item.customer || "-",
      "Group Name": item.group_name || "-",
      "Customer Email": item.customer_email || "-",
      "Customer Phone": item.customer_phone || "-",
      Amount: `$${item.amount || 0}`,
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

  const hasData = lists && lists.length > 0;

  return {
    dataList: lists,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    summaryCards,
    isFetching: isFetching || isSummaryFetching,
    isError: isError || isSummaryError,
    error,
    handlePageChange,
    handleExport,
    handlePrint,
    hasData,
  };
};
