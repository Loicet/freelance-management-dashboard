// DashboardStats.tsx - Component to display dashboard statistics

import React from "react";
import { DashboardStats } from "./types";
import { formatCurrency } from "./utils";

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
      color: "#2196F3",
    },
    {
      label: "Total Projects",
      value: stats.totalProjects,
      color: "#9C27B0",
    },
    {
      label: "Paid Projects",
      value: stats.paidProjects,
      color: "#4CAF50",
    },
    {
      label: "Unpaid Projects",
      value: stats.unpaidProjects,
      color: "#F44336",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      color: "#FF9800",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      {statItems.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: `2px solid ${item.color}`,
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: item.color,
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}