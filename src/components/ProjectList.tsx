// ProjectList.tsx - Component to display and manage projects

import React from "react";
import { Project, Client } from "./types";
import {
  findClientById,
  formatCurrency,
  getStatusColor,
  getPaymentStatusColor,
} from "./utils";

// Typed props for the ProjectList component
interface ProjectListProps {
  projects: Project[];
  clients: Client[];
  onMarkPaid: (projectId: string) => void; // Callback function
}

// ProjectList component - displays all projects with their details
export function ProjectList({ projects, clients, onMarkPaid }: ProjectListProps) {
  return (
    <div>
      {projects.map((project) => {
        // Find the client for this project (type-safe)
        const client = findClientById(clients, project.clientId);
        const clientName = client ? client.name : "Client not found";

        // Get colors for conditional styling
        const statusColor = getStatusColor(project.status);
        const paymentColor = getPaymentStatusColor(project.paymentStatus);

        return (
          <div
            key={project.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>
                  {project.title}
                </h3>
                
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                  <strong>Client:</strong> {clientName}
                </p>
                
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                  <strong>Budget:</strong> {formatCurrency(project.budget)}
                </p>
                
                <div style={{ marginTop: "8px", display: "flex", gap: "12px" }}>
                  {/* Status badge with conditional styling */}
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: `${statusColor}20`,
                      color: statusColor,
                      border: `1px solid ${statusColor}`,
                    }}
                  >
                    {project.status.toUpperCase()}
                  </span>
                  
                  {/* Payment status badge with conditional styling */}
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: `${paymentColor}20`,
                      color: paymentColor,
                      border: `1px solid ${paymentColor}`,
                    }}
                  >
                    {project.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* Button to mark project as paid (only shown if unpaid) */}
              {project.paymentStatus === "unpaid" && (
                <button
                  onClick={() => onMarkPaid(project.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#45a049";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#4CAF50";
                  }}
                >
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Show message if no projects */}
      {projects.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
          No projects found
        </p>
      )}
    </div>
  );
}