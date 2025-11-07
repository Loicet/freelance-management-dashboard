// utils.ts - Utility functions for the dashboard (all fully typed)

import type { Client, Project, Payment, DashboardStats } from "../types/types";

// 1. Count paid vs unpaid projects
export function countProjectsByPaymentStatus(projects: Project[]): {
  paid: number;
  unpaid: number;
} {
  const paid = projects.filter((p) => p.paymentStatus === "paid").length;
  const unpaid = projects.filter((p) => p.paymentStatus === "unpaid").length;
  return { paid, unpaid };
}

// 2. Find client by ID safely (returns undefined if not found)
export function findClientById(
  clients: Client[],
  clientId: string
): Client | undefined {
  return clients.find((client) => client.id === clientId);
}

// 3. Record a new payment with validation
export function createPayment(
  projectId: string,
  amount: number,
  date?: string // Optional, defaults to now
): Payment | null {
  // Validation: amount must be positive
  if (amount <= 0) {
    console.error("Payment amount must be positive");
    return null;
  }

  return {
    projectId,
    amount,
    date: date || new Date().toISOString(),
  };
}

// 4. Filter projects by status
export function filterProjectsByStatus(
  projects: Project[],
  status: Project["status"]
): Project[] {
  return projects.filter((p) => p.status === status);
}

// 5. Filter projects by payment status
export function filterProjectsByPaymentStatus(
  projects: Project[],
  paymentStatus: Project["paymentStatus"]
): Project[] {
  return projects.filter((p) => p.paymentStatus === paymentStatus);
}

// 6. Search clients by name (case-insensitive)
export function searchClientsByName(
  clients: Client[],
  searchTerm: string
): Client[] {
  const term = searchTerm.toLowerCase();
  return clients.filter((client) =>
    client.name.toLowerCase().includes(term)
  );
}

// 7. Search projects by title (case-insensitive)
export function searchProjectsByTitle(
  projects: Project[],
  searchTerm: string
): Project[] {
  const term = searchTerm.toLowerCase();
  return projects.filter((project) =>
    project.title.toLowerCase().includes(term)
  );
}

// 8. Calculate dashboard statistics
export function calculateDashboardStats(
  clients: Client[],
  projects: Project[],
  payments: Payment[]
): DashboardStats {
  const { paid, unpaid } = countProjectsByPaymentStatus(projects);
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return {
    totalProjects: projects.length,
    paidProjects: paid,
    unpaidProjects: unpaid,
    totalClients: clients.length,
    totalRevenue,
  };
}

// 9. Get status Tailwind classes for conditional styling
export function getStatusClasses(status: Project["status"]): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-500";
    case "in-progress":
      return "bg-blue-100 text-blue-700 border-blue-500";
    case "pending":
      return "bg-orange-100 text-orange-700 border-orange-500";
    default:
      return "bg-gray-100 text-gray-700 border-gray-500";
  }
}

// 10. Get payment status Tailwind classes for conditional styling
export function getPaymentStatusClasses(
  paymentStatus: Project["paymentStatus"]
): string {
  return paymentStatus === "paid"
    ? "bg-green-100 text-green-700 border-green-500"
    : "bg-red-100 text-red-700 border-red-500";
}

// 11. Format currency (helper function)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// 12. Format date (helper function)
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// 13. Type narrowing example - safely access client email
export function getClientEmail(client: Client): string {
  // Type narrowing: check if email exists before using it
  if (client.email) {
    return client.email;
  }
  return "No email provided";
}