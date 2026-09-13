import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@screenComponent/home/eyebrow";
import { Button } from "@shadcnComponent/button";
import { NAVIGATION_ROUTES } from "@/routes/navigation.routes";

export default function ApplicationsSection() {
  return (
    <section
      className="bg-[#e7eae1] px-[7vw] py-14 sm:py-20 lg:py-28"
      id="applications"
    >
      <div>
        <Eyebrow>03 / Open possibilities</Eyebrow>
        <div className="mt-8 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <h2 className="text-[clamp(2.25rem,9vw,2.8rem)] sm:text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.055em]">
            For the world
            <br />
            <span className="text-[#89947d]">you’re building.</span>
          </h2>
          <p className="max-w-xs text-base leading-7 text-[#728064]">
            From personal spaces to shared places. Give your ideas a place
            to take shape.
          </p>
        </div>
      </div>
      <div className="mt-9 border-b sm:mt-14 border-black/10 lg:mt-20">
        {[
          [
            "01",
            "Residential.",
            "Places to call your own.",
            "Homes, partitions, and boundary walls. The beginnings of everyday life.",
          ],
          [
            "02",
            "Commercial.",
            "Make room for what’s next.",
            "Workplaces and retail spaces. Built around the way we connect and grow.",
          ],
          [
            "03",
            "Landscape.",
            "Take the possibilities outside.",
            "Paths, courtyards, and open spaces. A considered finish, underfoot.",
          ],
        ].map(([number, title, label, text]) => (
          <article
            className="group grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-4 border-t border-black/10 py-8 lg:grid-cols-[5rem_1fr_1fr_auto] lg:items-center lg:gap-7"
            key={number}
          >
            <span className="hidden text-2xl tracking-[-0.08em] sm:block text-[#9eac8c]">
              {number}
            </span>
            <div>
              <Eyebrow>{label}</Eyebrow>
              <h3 className="mt-2 text-3xl font-medium tracking-tighter transition-transform duration-300 group-hover:translate-x-2 lg:text-5xl">
                {title}
              </h3>
            </div>
            <p className="col-start-1 row-start-2 max-w-xs sm:col-start-2 lg:row-start-1 text-base leading-7 text-[#718161] lg:col-start-3">
              {text}
            </p>
            <Button
              className="col-start-2 row-start-1 sm:col-start-3 lg:col-start-4"
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href={NAVIGATION_ROUTES.SECTIONS.MATERIALS}
                aria-label={`Explore blocks for ${title}`}
              >
                <ArrowUpRight />
              </a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
