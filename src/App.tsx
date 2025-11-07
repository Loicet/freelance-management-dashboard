// App.tsx - Main application component

import { useState } from "react";
import { DashboardProvider, useDashboard } from "./context/DashboardContext";
import { ClientCard } from "./components/ClientCard";
import { ProjectList } from "./components/ProjectList";
import { DashboardStatsComponent } from "./components/DashboardStats";
import { PaymentList } from "./components/paymentList";
import {
  calculateDashboardStats,
  searchClientsByName,
  searchProjectsByTitle,
  filterProjectsByPaymentStatus,
} from "./utils/utils";
import type { Client } from "./types/types";

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
    <div className="w-full min-h-screen bg-gray-100 p-5">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Freelance Management Dashboard
        </h1>
        <p className="text-gray-600 text-base">
          Manage your clients, projects, and payments all in one place
        </p>
      </header>

      {/* Dashboard Statistics */}
      <DashboardStatsComponent stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Clients Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Clients</h2>
            
            {/* Search input for clients */}
            <input
              type="text"
              placeholder="Search clients..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Client list */}
            {filteredClients.map((client: Client) => (
              <ClientCard key={client.id} client={client} />
            ))}
            
            {filteredClients.length === 0 && (
              <p className="text-center text-gray-500 py-5">
                No clients found
              </p>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
            
            {/* Search and filter controls */}
            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <select
                value={paymentFilter}
                onChange={(e) =>
                  setPaymentFilter(e.target.value as "all" | "paid" | "unpaid")
                }
                aria-label="Filter projects by payment status"
                className="px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-white p-5 rounded-lg shadow-sm">
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