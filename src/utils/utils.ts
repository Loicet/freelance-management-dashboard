// utils.ts - Utility functions for the dashboard (all fully typed)

import { Client, Project, Payment, DashboardStats } from "../types/types";

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

// 9. Get status color for conditional styling
export function getStatusColor(status: Project["status"]): string {
  switch (status) {
    case "completed":
      return "green";
    case "in-progress":
      return "blue";
    case "pending":
      return "orange";
    default:
      return "gray";
  }
}

// 10. Get payment status color for conditional styling
export function getPaymentStatusColor(
  paymentStatus: Project["paymentStatus"]
): string {
  return paymentStatus === "paid" ? "green" : "red";
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