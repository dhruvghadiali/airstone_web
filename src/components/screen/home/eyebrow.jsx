import { cn } from "@/lib/utils";

export function Eyebrow({ children, light = false }) {
  return (
    <p
      className={cn(
        "text-xs font-medium tracking-[0.12em] uppercase",
        light ? "text-white/55" : "text-[#6e7862]",
      )}
    >
      {children}
    </p>
  );
}
