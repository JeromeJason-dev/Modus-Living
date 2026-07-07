export function Loader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-ink-soft">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-clay"
        role="status"
        aria-label={label}
      />
      <p className="text-sm tracking-wide">{label}…</p>
    </div>
  );
}
