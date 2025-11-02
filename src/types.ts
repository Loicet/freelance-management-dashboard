// types.ts - All TypeScript models and types for the dashboard

// Client model - represents a client/customer
export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string; // Optional property (may not always have email)
}

// Project model - represents a project for a client
export interface Project {
  id: string;
  clientId: string; // Links to a Client
  title: string;
  budget: number;
  status: "pending" | "in-progress" | "completed"; // Union type - only these 3 values allowed
  paymentStatus: "paid" | "unpaid"; // Union type - only these 2 values allowed
}

// Payment model - represents a payment for a project
export interface Payment {
  projectId: string; // Links to a Project
  amount: number;
  date: string; // ISO format date string
}

// Dashboard State - the complete state of our application
export interface DashboardState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// Action Types - Discriminated Union for type-safe actions
// Each action has a 'type' property that identifies it
export type DashboardAction =
  | { type: "MARK_PROJECT_PAID"; projectId: string }
  | { type: "ADD_PAYMENT"; payment: Payment }
  | { type: "UPDATE_PROJECT_STATUS"; projectId: string; status: Project["status"] }
  | { type: "ADD_PROJECT"; project: Project }
  | { type: "ADD_CLIENT"; client: Client };

// Statistics type for dashboard summary
export interface DashboardStats {
  totalProjects: number;
  paidProjects: number;
  unpaidProjects: number;
  totalClients: number;
  totalRevenue: number;
}