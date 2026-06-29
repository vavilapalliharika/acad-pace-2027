import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/track/dsa")({
  head: () => ({ meta: [{ title: "DSA Track · PACE 2027" }] }),
  component: () => (
    <iframe
      src="/track.html?t=dsa"
      title="DSA Track"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  ),
});
