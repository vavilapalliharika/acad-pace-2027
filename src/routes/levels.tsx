import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/levels")({
  head: () => ({ meta: [{ title: "Levels · PACE 2027" }] }),
  component: () => (
    <iframe
      src="/levels.html"
      title="Levels"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  ),
});
