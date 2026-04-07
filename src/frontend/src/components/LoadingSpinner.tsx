import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  className?: string;
  label?: string;
}

const SIZE_MAP = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-3",
};

export default function LoadingSpinner({
  size = "md",
  fullPage = false,
  className,
  label = "Loading...",
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "rounded-full border-border border-t-primary animate-spin",
        SIZE_MAP[size],
        className,
      )}
    />
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        {spinner}
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }

  return spinner;
}
