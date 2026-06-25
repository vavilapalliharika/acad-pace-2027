import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RISE 2027 — Placement Readiness Accelerator" },
      { name: "description", content: "NxtWave's 180-day structured PRA program for YOG 2027 graduates." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <iframe
      src="/landing.html"
      title="RISE 2027"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  );
}
