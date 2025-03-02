import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardShell } from "../components/DashboardShell";
import { AnalyticsCards } from "./components/AnalyticsCards";
import { AnalyticsCharts } from "./components/AnalyticsCharts";
import { AnalyticsTable } from "./components/AnalyticsTable";

export default function PageAnalytics() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics"></DashboardHeader>
      <div className="space-y-8">
        <AnalyticsCards />
        <AnalyticsCharts />
        <AnalyticsTable />
      </div>
    </DashboardShell>
  );
}
