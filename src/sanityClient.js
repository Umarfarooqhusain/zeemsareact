import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "bazw3s7l", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2023-12-19", // Use current date as API version
  useCdn: true,
});

export default client;
