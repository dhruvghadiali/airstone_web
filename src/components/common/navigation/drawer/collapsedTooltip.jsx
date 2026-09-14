import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shadcnComponent/tooltip";

export default function CollapsedTooltip({ collapsed, label, children }) {
  if (!collapsed) {
    return children;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={12}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
