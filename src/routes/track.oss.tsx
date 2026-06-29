import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/track/oss")({
  head: () => ({ meta: [{ title: "Open Source · PACE 2027" }] }),
  component: () => (
    <iframe
      src="/track.html?t=oss"
      title="Open Source"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  ),
});
