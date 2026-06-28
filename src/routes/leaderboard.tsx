import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard · PACE 2027" }] }),
  component: LeaderboardRoute,
});

function LeaderboardRoute() {
  return (
    <iframe
      src="/leaderboard.html"
      title="Leaderboard"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  );
}
