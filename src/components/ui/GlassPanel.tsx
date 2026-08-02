import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  /** Soft primary wash at the top */
  sheen?: boolean;
  as?: "div" | "article" | "section";
};

const GlassPanel = ({ children, className, sheen = true, as: Tag = "div" }: GlassPanelProps) => (
  <Tag className={cn("liquid-glass", sheen && "liquid-glass-sheen", className)}>
    {children}
  </Tag>
);

export default GlassPanel;
