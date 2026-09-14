import { ArrowDown, ArrowUpRight } from "lucide-react";
import _ from "lodash";
import { Button } from "@shadcnComponent/button";
import { Eyebrow } from "@screenComponent/home/eyebrow";
import { products } from "@screenComponent/home/homeData";
import {
  createSectionRoute,
  NAVIGATION_ROUTES,
} from "@routes/navigation.routes";

export default function HeroSection() {
  return (
    <section id="home" className="bg-background px-[5vw] pb-8 pt-8 sm:pt-12 lg:pt-20">
      <div className="mx-auto max-w-360">
        <div className="grid items-center gap-10 pb-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-20">
          <div className="min-w-0 max-w-2xl">
            <Eyebrow>Building materials. Reimagined.</Eyebrow>
            <h1 className="mt-7 text-[clamp(2.75rem,12vw,4.5rem)] lg:text-[clamp(3.5rem,7.5vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.065em]">
              Great spaces.<br />
              <span className="text-muted">Solid beginnings.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#596052] lg:text-lg lg:leading-8">
              Thoughtful materials for the places you’re building. Explore blocks
              for walls, outdoor spaces, and everything in between.
            </p>
            <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap">
              <Button variant="accent" size="lg" asChild>
                <a href={NAVIGATION_ROUTES.SECTIONS.MATERIALS}>Explore materials <ArrowUpRight /></a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={NAVIGATION_ROUTES.SECTIONS.APPROACH}>Our approach <ArrowDown /></a>
              </Button>
            </div>
          </div>
          <figure className="m-0 overflow-hidden rounded-3xl border border-black/10 bg-[#d9dcd5]">
            <img
              src="/blocks-hero.png"
              alt="Concrete blocks showing their texture and hollow-core form"
              width="1536"
              height="1024"
              fetchPriority="high"
              className="aspect-4/3 w-full object-cover lg:aspect-square"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f6f0] px-4 py-4 text-[10px] sm:px-6 sm:py-5 sm:text-xs uppercase tracking-widest text-[#596052]">
              <span>Honest texture. Considered form.</span>
              <span>Airstone</span>
            </figcaption>
          </figure>
        </div>
        <div className="grid gap-3 border-t border-black/10 pt-6 sm:grid-cols-3">
          {_.map(products, (product, index) => (
            <a
              key={product.name}
              href={createSectionRoute(product.id)}
              className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white/30 p-4 lg:p-5 transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="text-xs text-[#596052]">0{index + 1}</span>
              <span className="min-w-0 text-sm font-medium lg:text-base">{product.name}</span>
              <ArrowUpRight className="ml-auto size-4 shrink-0 text-[#596052] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
