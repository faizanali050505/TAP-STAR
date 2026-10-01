import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !reverse,
          "flex-row-reverse": reverse,
        },
        className,
      )}
    >
      <div
        className={cn("flex shrink-0 justify-around [gap:var(--gap)] animate-marquee", {
          "[animation-direction:reverse]": reverse,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
        })}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn("flex shrink-0 justify-around [gap:var(--gap)] animate-marquee", {
          "[animation-direction:reverse]": reverse,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
        })}
      >
        {children}
      </div>
    </div>
  );
}
