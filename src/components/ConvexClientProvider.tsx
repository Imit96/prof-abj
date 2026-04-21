"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Lazily initialised so the module doesn't throw during static prerendering
// when NEXT_PUBLIC_CONVEX_URL is not yet available in the build environment.
let convexClient: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  if (!convexClient) {
    convexClient = new ConvexReactClient(url);
  }
  return convexClient;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const client = getConvexClient();

  // If env var is missing (e.g. during static build), render children without
  // the Convex provider — queries will simply return undefined until the client
  // hydrates on the browser with the real URL.
  if (!client) return <>{children}</>;

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
