"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechBadgeProps {
  name: string;
  experience?: string;
  index?: number;
}

export function TechBadge({ name, experience, index = 0 }: TechBadgeProps) {
  const badge = (
    <Badge
      variant="secondary"
      className="cursor-default px-3 py-1 text-sm transition-all duration-300 hover:scale-110 hover:brightness-110"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {name}
    </Badge>
  );

  if (experience) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>{experience} of experience</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}
