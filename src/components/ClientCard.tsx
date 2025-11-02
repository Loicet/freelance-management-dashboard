// ClientCard.tsx - Reusable component to display client information

import React from "react";
import { Client } from "./types";
import { getClientEmail } from "./utils";

// Typed props for the ClientCard component
interface ClientCardProps {
  client: Client;
}

// ClientCard component - displays a single client's information
export function ClientCard({ client }: ClientCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>
        {client.name}
      </h3>
      
      <div style={{ fontSize: "14px", color: "#666" }}>
        <p style={{ margin: "4px 0" }}>
          <strong>Country:</strong> {client.country}
        </p>
        
        <p style={{ margin: "4px 0" }}>
          <strong>Email:</strong> {getClientEmail(client)}
        </p>
        
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "12px",
            color: "#999",
          }}
        >
          ID: {client.id}
        </p>
      </div>
    </div>
  );
}