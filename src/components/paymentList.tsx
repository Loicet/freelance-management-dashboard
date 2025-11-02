// PaymentList.tsx - Component to display payment records

import React from "react";
import { Payment, Project } from "./types";
import { formatCurrency, formatDate } from "./utils";

// Typed props for the PaymentList component
interface PaymentListProps {
  payments: Payment[];
  projects: Project[];
}

// PaymentList component - displays all payment records
export function PaymentList({ payments, projects }: PaymentListProps) {
  return (
    <div>
      <h2 style={{ marginBottom: "16px", color: "#333" }}>Payment History</h2>
      
      {payments.map((payment, index) => {
        // Find the project for this payment (type-safe lookup)
        const project = projects.find((p) => p.id === payment.projectId);
        const projectTitle = project ? project.title : "Project not found";

        return (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>
                  {projectTitle}
                </h4>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                  <strong>Date:</strong> {formatDate(payment.date)}
                </p>
                <p style={{ margin: "4px 0", fontSize: "12px", color: "#999" }}>
                  Project ID: {payment.projectId}
                </p>
              </div>
              
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#4CAF50",
                }}
              >
                {formatCurrency(payment.amount)}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Show message if no payments */}
      {payments.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
          No payment records found
        </p>
      )}
    </div>
  );
}