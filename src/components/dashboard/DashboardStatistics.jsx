import OrderAnlyticChart from "./StatisticsCards/OrderAnlyticChart";
import RevenueAnalyticChart from "./StatisticsCards/RevenueAnalyticChart";

function DashboardStatistics() {
  return (
    <section className="flex flex-col lg:flex-row gap-4">
        <OrderAnlyticChart />
        <RevenueAnalyticChart />
    </section>
  );
}

export default DashboardStatistics;
