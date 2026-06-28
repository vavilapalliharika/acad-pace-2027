import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/announcements")({
  head: () => ({ meta: [{ title: "Announcements · PACE 2027" }] }),
  component: AnnouncementsRoute,
});

function AnnouncementsRoute() {
  return (
    <iframe
      src="/announcements.html"
      title="Announcements"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  );
}
