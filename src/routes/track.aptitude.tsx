import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/track/aptitude")({
  head: () => ({ meta: [{ title: "Aptitude & GD · RISE 2027" }] }),
  component: () => (
    <iframe
      src="/track.html?t=aptitude"
      title="Aptitude & GD"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  ),
});
