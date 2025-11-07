// ClientCard.tsx - Reusable component to display client information

import type { Client } from "../types/types";
import { getClientEmail } from "../utils/utils";

// Typed props for the ClientCard component
interface ClientCardProps {
  client: Client;
}

// ClientCard component - displays a single client's information
export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-3 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {client.name}
      </h3>
      
      <div className="text-sm text-gray-600">
        <p className="mb-1">
          <span className="font-semibold">Country:</span> {client.country}
        </p>
        
        <p className="mb-1">
          <span className="font-semibold">Email:</span> {getClientEmail(client)}
        </p>
        
        <p className="mt-2 text-xs text-gray-400">
          ID: {client.id}
        </p>
      </div>
    </div>
  );
}