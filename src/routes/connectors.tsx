import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/connectors")({
  head: () => ({ meta: [{ title: "Connectors · PACE 2027" }] }),
  component: () => (
    <iframe
      src="/connectors.html"
      title="Connectors"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  ),
});
