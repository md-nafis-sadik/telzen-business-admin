import {
  DashboardCardFourIcon,
  DashboardCardOneIcon,
  DashboardCardThreeIcon,
  DashboardCardTwoIcon,
  formatNumberIN,
} from "@/services";
import DashboardCard from "./DashboardCard";
import SelectInput from "../shared/SelectInput";
import { useState } from "react";
import { useGetDashboardCardDataQuery } from "@/features/dashboard/dashboardApi";

function DashboardCards() {
  const [filter, setFilter] = useState("last6months");
  const { data: apiData, isFetching } = useGetDashboardCardDataQuery(filter);
  const dashboardCardData = apiData?.data || {};

  // const filterOptions = [
  //   { id: "this_month", timestamp: "This Month" },
  //   { id: "last6months", timestamp: "Last 6 Months" },
  //   { id: "yearly", timestamp: "Yearly" },
  // ];

  // const handleFilterChange = (newFilter) => {
  //   setFilter(newFilter);
  // };
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* <div className="flex justify-between items-center mb-4">
        <h4 className="text-text-700 text-lg font-bold leading-normal">
          Overview
        </h4>
        <div className="flex items-center gap-2">
          <div className="text-text-500 text-sm">Showing: </div>
          <SelectInput
            data={filterOptions}
            value={filter}
            onValueChange={handleFilterChange}
            placeHolder="Filter by status"
            labelKey="timestamp"
            selector="id"
            triggerClassName="w-26 !border-none p-1 font-semibold truncate !border-white text-sm"
          />
        </div>
      </div> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-[60%]">
        <DashboardCard
          title="Total eSIM"
          amount={dashboardCardData?.total_esims || 0}
          isFetching={isFetching}
          icon={<DashboardCardOneIcon />}
          // className="bg-[#FFECD3]"
          // animateClass="text-[#00C896]"
        />
        <DashboardCard
          title="Total Spent"
          amount={`$${formatNumberIN(dashboardCardData?.total_spent) || 0}`}
          isFetching={isFetching}
          icon={<DashboardCardTwoIcon />}
          // className="bg-[#C6FFBC]"
          // animateClass="text-[#00C896]"
        />
        <DashboardCard
          title="Users"
          amount={dashboardCardData?.total_customers || 0}
          isFetching={isFetching}
          icon={<DashboardCardThreeIcon />}
          // className="bg-[#DDF1FF]"
          // animateClass="text-[#00C896]"
        />
        <DashboardCard
          title="Revenue"
          amount={`$${formatNumberIN(dashboardCardData?.total_revenue) || 0}`}
          isFetching={isFetching}
          icon={<DashboardCardFourIcon />}
          // className="bg-[#FFF3C5]"
          // animateClass="text-[#00C896]"
        />
      </div>
      <div className=" gap-4 w-full lg:w-[40%]">
        {/* <DashboardCard
          title="-"
          amount={`-`}
          isFetching={isFetching}
          icon={<DashboardCardFourIcon />}
          className="bg-[#F9D3D3]"
          // animateClass="text-[#00C896]"
        /> */}

        <section className="bg-[#F9D3D3] rounded-2xl px-6 py-7 h-full"></section>
      </div>
    </div>
  );
}

export default DashboardCards;
