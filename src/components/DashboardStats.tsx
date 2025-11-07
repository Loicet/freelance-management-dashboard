// DashboardStats.tsx - Component to display dashboard statistics

import type { DashboardStats } from "../types/types";
import { formatCurrency } from "../utils/utils";

// Typed props for the DashboardStats component
interface DashboardStatsProps {
  stats: DashboardStats;
}

// DashboardStats component - displays summary statistics
export function DashboardStatsComponent({ stats }: DashboardStatsProps) {
  // Array of stat items for easy rendering
  const statItems = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      colorClasses: "border-blue-500 text-blue-600",
    },
    {
      label: "Total Projects",
      value: stats.totalProjects,
      colorClasses: "border-purple-500 text-purple-600",
    },
    {
      label: "Paid Projects",
      value: stats.paidProjects,
      colorClasses: "border-green-500 text-green-600",
    },
    {
      label: "Unpaid Projects",
      value: stats.unpaidProjects,
      colorClasses: "border-red-500 text-red-600",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      colorClasses: "border-orange-500 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statItems.map((item, index) => (
        <div
          key={index}
          className={`bg-white p-5 rounded-lg shadow-sm border-2 ${item.colorClasses}`}
        >
          <div className="text-sm text-gray-600 mb-2 font-medium">
            {item.label}
          </div>
          <div className={`text-3xl font-bold ${item.colorClasses}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}