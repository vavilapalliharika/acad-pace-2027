import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/placement-journey")({
  head: () => ({ meta: [{ title: "Placement Journey · PACE 2027" }] }),
  component: () => (
    <iframe
      src="/placement-journey.html"
      title="Placement Journey"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  ),
});
