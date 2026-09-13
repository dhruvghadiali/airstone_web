import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@screenComponent/home/eyebrow";
import { Button } from "@shadcnComponent/button";
import { NAVIGATION_ROUTES } from "@/routes/navigation.routes";

export default function CallToActionSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#e16f4b] px-[7vw] py-14 sm:py-20 lg:py-24"
    >
      <Eyebrow>Every great build starts somewhere.</Eyebrow>
      <h2 className="my-7 text-[clamp(2.75rem,12vw,3.8rem)] sm:my-10 sm:text-[clamp(3.8rem,9vw,9rem)] font-medium leading-none tracking-[-0.065em]">
        Let’s make
        <br />
        <em className="text-[#813b29]">something solid.</em>
      </h2>
      <Button className="w-full sm:w-auto" size="lg" asChild>
        <a href={NAVIGATION_ROUTES.SECTIONS.MATERIALS}>
          Find your starting point <ArrowUpRight />
        </a>
      </Button>
      <ArrowUpRight className="absolute right-[7vw] top-1/3 hidden size-36 text-[#b54d31] lg:block" />
    </section>
  );
}
