// App.tsx - Main application component

import React, { useState } from "react";
import { DashboardProvider, useDashboard } from "./DashboardContext";
import { ClientCard } from "./ClientCard";
import { ProjectList } from "./ProjectList";
import { DashboardStatsComponent } from "./DashboardStats";
import { PaymentList } from "./PaymentList";
import {
  calculateDashboardStats,
  searchClientsByName,
  searchProjectsByTitle,
  filterProjectsByPaymentStatus,
} from "./utils";

// Main Dashboard component (uses the context)
function Dashboard() {
  const { state, dispatch } = useDashboard();
  
  // Local state for search and filter
  const [clientSearch, setClientSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "unpaid">("all");

  // Calculate statistics
  const stats = calculateDashboardStats(
    state.clients,
    state.projects,
    state.payments
  );

  // Handle marking a project as paid
  const handleMarkPaid = (projectId: string) => {
    dispatch({ type: "MARK_PROJECT_PAID", projectId });
  };

  // Filter and search logic
  const filteredClients = clientSearch
    ? searchClientsByName(state.clients, clientSearch)
    : state.clients;

  let filteredProjects = projectSearch
    ? searchProjectsByTitle(state.projects, projectSearch)
    : state.projects;

  if (paymentFilter !== "all") {
    filteredProjects = filterProjectsByPaymentStatus(
      filteredProjects,
      paymentFilter
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "8px",
          }}
        >
          Freelance Management Dashboard
        </h1>
        <p style={{ color: "#666", fontSize: "16px" }}>
          Manage your clients, projects, and payments all in one place
        </p>
      </header>

      {/* Dashboard Statistics */}
      <DashboardStatsComponent stats={stats} />

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Clients Section */}
        <div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "16px", color: "#333" }}>Clients</h2>
            
            {/* Search input for clients */}
            <input
              type="text"
              placeholder="Search clients..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                marginBottom: "16px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
            
            {/* Client list */}
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
            
            {filteredClients.length === 0 && (
              <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
                No clients found
              </p>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "16px", color: "#333" }}>Projects</h2>
            
            {/* Search and filter controls */}
            <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
              <input
                type="text"
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
              
              <select
                value={paymentFilter}
                onChange={(e) =>
                  setPaymentFilter(e.target.value as "all" | "paid" | "unpaid")
                }
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                }}
              >
                <option value="all">All Projects</option>
                <option value="paid">Paid Only</option>
                <option value="unpaid">Unpaid Only</option>
              </select>
            </div>
            
            {/* Project list */}
            <ProjectList
              projects={filteredProjects}
              clients={state.clients}
              onMarkPaid={handleMarkPaid}
            />
          </div>
        </div>
      </div>

      {/* Payments Section */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <PaymentList payments={state.payments} projects={state.projects} />
      </div>
    </div>
  );
}

// App component (wraps Dashboard with Provider)
export default function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}