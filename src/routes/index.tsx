import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RISE 2027 — Placement Acceleration & Career Excellence" },
      { name: "description", content: "Structured placement acceleration for YOG 2027 — cohort-based learning, tracks, and a readiness dashboard." },
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
