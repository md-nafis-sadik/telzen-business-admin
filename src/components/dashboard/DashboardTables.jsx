import BrickListDashboard from "./Tables/BrickListDashboard";
import StaffPerformanceDashboard from "./Tables/StaffPerformanceDashboard";
import {
  useGetStaffPerformanceQuery,
  useGetTopBricksQuery,
} from "@/features/dashboard/dashboardApi";
import { useState } from "react";

function DashboardTables() {
  const [staffFilter, setStaffFilter] = useState("last6months");
  const [brickFilter, setBrickFilter] = useState("last6months");

    const filterOptions = [
    { id: "this_month", timestamp: "This Month" },
    { id: "last6months", timestamp: "Last 6 Months" },
    { id: "yearly", timestamp: "Yearly" },
  ];

  const {
    data: staffData,
    isFetching: isStaffFetching,
    isError: isStaffError,
    error: staffError,
  } = useGetStaffPerformanceQuery(staffFilter);
  const {
    data: brickData,
    isFetching: isBrickFetching,
    isError: isBrickError,
    error: brickError,
  } = useGetTopBricksQuery(brickFilter);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <StaffPerformanceDashboard
        isFetching={isStaffFetching}
        isError={isStaffError}
        error={staffError}
        data={staffData?.data || []}
        filter={staffFilter}
        onFilterChange={setStaffFilter}
        filterOptions={filterOptions}
      />
      <BrickListDashboard
        isFetching={isBrickFetching}
        isError={isBrickError}
        error={brickError}
        data={brickData?.data || []}
        filter={brickFilter}
        onFilterChange={setBrickFilter}
        filterOptions={filterOptions}
      />
    </div>
  );
}

export default DashboardTables;
