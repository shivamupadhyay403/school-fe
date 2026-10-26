
import { LoaderCircle } from "lucide-react";

type ScreenLoaderProps = {
  message?: string;
};

export default function Loader({
  message = "Please wait...",
}: ScreenLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 shadow-lg">
        <LoaderCircle
          size={40}
          className="animate-spin text-[#4D3FD6]"
          aria-hidden="true"
        />

        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
    </div>
  );
}
