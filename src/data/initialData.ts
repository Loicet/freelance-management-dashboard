// initialData.ts - Sample data for the dashboard

import { Client, Project, Payment } from "../types/types";

// Sample clients
export const initialClients: Client[] = [
  {
    id: "client-1",
    name: "Tech Startup Inc",
    country: "United States",
    email: "contact@techstartup.com",
  },
  {
    id: "client-2",
    name: "Design Studio",
    country: "United Kingdom",
    // Note: no email property - it's optional
  },
  {
    id: "client-3",
    name: "E-commerce Solutions",
    country: "Canada",
    email: "hello@ecommerce.com",
  },
];

// Sample projects
export const initialProjects: Project[] = [
  {
    id: "project-1",
    clientId: "client-1",
    title: "Mobile App Development",
    budget: 15000,
    status: "in-progress",
    paymentStatus: "unpaid",
  },
  {
    id: "project-2",
    clientId: "client-2",
    title: "Website Redesign",
    budget: 8000,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "project-3",
    clientId: "client-1",
    title: "API Integration",
    budget: 5000,
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "project-4",
    clientId: "client-3",
    title: "Online Store Setup",
    budget: 12000,
    status: "completed",
    paymentStatus: "paid",
  },
];

// Sample payments
export const initialPayments: Payment[] = [
  {
    projectId: "project-2",
    amount: 8000,
    date: "2025-01-15T10:00:00Z",
  },
  {
    projectId: "project-4",
    amount: 12000,
    date: "2025-01-20T14:30:00Z",
  },
];