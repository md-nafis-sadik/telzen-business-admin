import DashboardCard from "@/components/dashboard/DashboardCards";
import DashboardStatistics from "@/components/dashboard/DashboardStatistics";
import DashboardTables from "@/components/dashboard/DashboardTables";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardCard />
      <DashboardStatistics />
      <DashboardTables />
    </div>
  );
}

export default Dashboard;
