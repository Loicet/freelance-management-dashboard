// ProjectList.tsx - Component to display and manage projects

import type { Project, Client } from "../types/types";
import {
  findClientById,
  formatCurrency,
  getStatusClasses,
  getPaymentStatusClasses,
} from "../utils/utils";

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

        // Get Tailwind classes for conditional styling
        const statusClasses = getStatusClasses(project.status);
        const paymentClasses = getPaymentStatusClasses(project.paymentStatus);

        return (
          <div
            key={project.id}
            className="border border-gray-300 rounded-lg p-4 mb-3 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Client:</span> {clientName}
                </p>
                
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Budget:</span> {formatCurrency(project.budget)}
                </p>
                
                <div className="mt-2 flex gap-3">
                  {/* Status badge with conditional Tailwind styling */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusClasses}`}>
                    {project.status.toUpperCase()}
                  </span>
                  
                  {/* Payment status badge with conditional Tailwind styling */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${paymentClasses}`}>
                    {project.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* Button to mark project as paid (only shown if unpaid) */}
              {project.paymentStatus === "unpaid" && (
                <button
                  onClick={() => onMarkPaid(project.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-semibold"
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
        <p className="text-center text-gray-500 py-5">
          No projects found
        </p>
      )}
    </div>
  );
}