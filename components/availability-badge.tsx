"use client";

import { Badge } from "@/components/ui/badge";
import { professionalInfo } from "@/lib/constants";

export function AvailabilityBadge() {
  return (
    <Badge
      variant="outline"
      className="animate-pulse border-primary/50 bg-primary/10 text-primary"
    >
      {professionalInfo.availability.message}
    </Badge>
  );
}
