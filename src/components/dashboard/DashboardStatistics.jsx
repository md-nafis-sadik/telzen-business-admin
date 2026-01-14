import SalesAnlyticChart from "./StatisticsCards/SalesAnlyticChart";
import RevenueAnalyticChart from "./StatisticsCards/RevenueAnalyticChart";

function DashboardStatistics() {
  return (
    <section className="flex flex-col lg:flex-row gap-4">
        <SalesAnlyticChart />
        <RevenueAnalyticChart />
    </section>
  );
}

export default DashboardStatistics;
