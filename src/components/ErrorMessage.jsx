import { Button } from "@/components/ui/button";

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
      <p className="font-display text-lg text-ink">Something went wrong</p>
      <p className="text-sm text-ink-soft">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
