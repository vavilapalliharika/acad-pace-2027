import { createFileRoute } from "@tanstack/react-router";

function TrackFrame({ k }: { k: string }) {
  return (
    <iframe
      src={`/track.html?t=${k}`}
      title={`Track ${k}`}
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  );
}

export const Route = createFileRoute("/track/ai")({
  head: () => ({ meta: [{ title: "AI Track · PACE 2027" }] }),
  component: () => <TrackFrame k="ai" />,
});
