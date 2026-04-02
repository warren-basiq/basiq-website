import { createClient, type SanityClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

function createSanityClient(): SanityClient | null {
  if (!projectId || projectId === "your-project-id") {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

export const sanityClient = createSanityClient();
