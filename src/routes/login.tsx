import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in · PACE 2027" }] }),
  component: LoginRoute,
});

function LoginRoute() {
  // Forward any ?next= query so the iframe redirects back after login
  const search = typeof window !== "undefined" ? window.location.search : "";
  return (
    <iframe
      src={`/login.html${search}`}
      title="Sign in"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0 }}
    />
  );
}
