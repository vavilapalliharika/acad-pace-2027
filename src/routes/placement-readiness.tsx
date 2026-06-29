import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/placement-readiness")({
  head: () => ({ meta: [{ title: "Placement Readiness · PACE 2027" }] }),
  component: PlacementReadinessRoute,
});

function PlacementReadinessRoute() {
  const search = typeof window !== "undefined" ? window.location.search : "";
  return (
    <iframe
      src={`/placement-readiness.html${search}`}
      title="Placement Readiness"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  );
}
