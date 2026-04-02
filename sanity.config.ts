import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "basiq",
  title: "Basiq",
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
