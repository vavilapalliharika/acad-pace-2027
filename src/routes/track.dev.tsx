import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/track/dev")({
  head: () => ({ meta: [{ title: "Dev & System Design · RISE 2027" }] }),
  component: () => (
    <iframe
      src="/track.html?t=dev"
      title="Dev & System Design"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  ),
});
