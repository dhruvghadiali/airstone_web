import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";

export default function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center gap-7 bg-[#f0f2eb] px-[5vw] py-10">
      <a href="#home">
        <Brand />
      </a>
      <p className="w-full text-sm text-[#77836b] md:w-auto">
        Building possibilities. Block by block.
      </p>
      <Button className="min-h-11 md:ml-auto" variant="ghost" size="sm" asChild>
        <a href="#home">
          Back to top <ArrowUpRight />
        </a>
      </Button>
      <span className="w-full border-t border-black/10 pt-6 text-xs text-[#7d896e]">
        © {new Date().getFullYear()} Airstone
      </span>
    </footer>
  );
}
