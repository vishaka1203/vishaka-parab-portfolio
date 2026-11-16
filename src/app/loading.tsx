export default function Loading() {
  return (
    <main
      id="main"
      className="section"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-panel" />
    </main>
  );
}
