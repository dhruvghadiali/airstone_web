import { ArrowUpRight } from "lucide-react";
import { Brand } from "@screenComponent/home/brand";
import { Button } from "@shadcnComponent/button";
import { NAVIGATION_ROUTES } from "@/routes/navigation.routes";

export default function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center gap-7 bg-[#f0f2eb] px-[5vw] py-10">
      <a href={NAVIGATION_ROUTES.SECTIONS.HOME}>
        <Brand />
      </a>
      <p className="w-full text-sm text-[#77836b] md:w-auto">
        Building possibilities. Block by block.
      </p>
      <Button className="min-h-11 md:ml-auto" variant="ghost" size="sm" asChild>
        <a href={NAVIGATION_ROUTES.SECTIONS.HOME}>
          Back to top <ArrowUpRight />
        </a>
      </Button>
      <span className="w-full border-t border-black/10 pt-6 text-xs text-[#7d896e]">
        © {new Date().getFullYear()} Airstone
      </span>
    </footer>
  );
}
