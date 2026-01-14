import TopBuyerDashboard from "./Tables/TopBuyerDashboard";
import RecentSalesDashboard from "./Tables/RecentSalesDashboard";
import {
  useGetRecentSalesPerformanceQuery,
  useGetTopBuyersQuery,
} from "@/features/dashboard/dashboardApi";
import { useState } from "react";

function DashboardTables() {
  const [recentSalesFilter, setRecentSalesFilter] = useState("last6months");
  const [topBuyerFilter, setBrickFilter] = useState("last6months");

  const filterOptions = [
    { id: "this_month", timestamp: "This Month" },
    { id: "last6months", timestamp: "Last 6 Months" },
    { id: "yearly", timestamp: "Yearly" },
  ];

  const {
    data: recentSalesData,
    isFetching: isRecentSalesFetching,
    isError: isRecentSalesError,
    error: recentSalesError,
  } = useGetRecentSalesPerformanceQuery(recentSalesFilter);
  const {
    data: topBuyerData,
    isFetching: isBrickFetching,
    isError: isBrickError,
    error: topBuyerError,
  } = useGetTopBuyersQuery(topBuyerFilter);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <RecentSalesDashboard
        isFetching={isRecentSalesFetching}
        isError={isRecentSalesError}
        error={recentSalesError}
        data={recentSalesData?.data || []}
        filter={recentSalesFilter}
        onFilterChange={setRecentSalesFilter}
        filterOptions={filterOptions}
      />
      <TopBuyerDashboard
        isFetching={isBrickFetching}
        isError={isBrickError}
        error={topBuyerError}
        data={topBuyerData?.data || []}
        filter={topBuyerFilter}
        onFilterChange={setBrickFilter}
        filterOptions={filterOptions}
      />
    </div>
  );
}

export default DashboardTables;
