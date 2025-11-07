// PaymentList.tsx - Component to display payment records

import type { Payment, Project } from "../types/types";
import { formatCurrency, formatDate } from "../utils/utils";

// Typed props for the PaymentList component
interface PaymentListProps {
  payments: Payment[];
  projects: Project[];
}

// PaymentList component - displays all payment records
export function PaymentList({ payments, projects }: PaymentListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Payment History
      </h2>
      
      {payments.map((payment, index) => {
        // Find the project for this payment (type-safe lookup)
        const project = projects.find((p) => p.id === payment.projectId);
        const projectTitle = project ? project.title : "Project not found";

        return (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 mb-3 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-base font-semibold text-gray-800 mb-2">
                  {projectTitle}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Date:</span> {formatDate(payment.date)}
                </p>
                <p className="text-xs text-gray-400">
                  Project ID: {payment.projectId}
                </p>
              </div>
              
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(payment.amount)}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Show message if no payments */}
      {payments.length === 0 && (
        <p className="text-center text-gray-500 py-5">
          No payment records found
        </p>
      )}
    </div>
  );
}