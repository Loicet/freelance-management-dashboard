// DashboardContext.tsx - Global state management with Context API + useReducer

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { DashboardState, DashboardAction } from "./types";
import { initialClients, initialProjects, initialPayments } from "./initialData";

// Initial state for the dashboard
const initialState: DashboardState = {
  clients: initialClients,
  projects: initialProjects,
  payments: initialPayments,
};

// Reducer function - handles all state updates in a type-safe way
function dashboardReducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
  // Use discriminated unions to handle different action types
  switch (action.type) {
    case "MARK_PROJECT_PAID":
      // Update a specific project's payment status
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.projectId
            ? { ...project, paymentStatus: "paid" as const }
            : project
        ),
      };

    case "ADD_PAYMENT":
      // Add a new payment to the payments array
      return {
        ...state,
        payments: [...state.payments, action.payment],
      };

    case "UPDATE_PROJECT_STATUS":
      // Update a project's status (pending, in-progress, completed)
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.projectId
            ? { ...project, status: action.status }
            : project
        ),
      };

    case "ADD_PROJECT":
      // Add a new project to the projects array
      return {
        ...state,
        projects: [...state.projects, action.project],
      };

    case "ADD_CLIENT":
      // Add a new client to the clients array
      return {
        ...state,
        clients: [...state.clients, action.client],
      };

    default:
      // TypeScript ensures we handle all action types
      // This line should never be reached
      return state;
  }
}

// Context type definition
interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// Provider component props
interface DashboardProviderProps {
  children: ReactNode;
}

// Provider component - wraps the app and provides state to all children
export function DashboardProvider({ children }: DashboardProviderProps) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use the dashboard context
// This ensures type safety and throws an error if used outside provider
export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  
  return context;
}