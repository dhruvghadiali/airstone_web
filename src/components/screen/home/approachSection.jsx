import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@screenComponent/home/eyebrow";
import { Button } from "@shadcnComponent/button";

export default function ApproachSection() {
  return (
    <section
      className="grid items-center gap-8 sm:gap-12 bg-[#1b211b] pb-14 sm:pb-20 text-[#edf0e9] lg:grid-cols-[1.2fr_1fr] lg:gap-[8vw] lg:py-0 lg:pr-[7vw]"
      id="approach"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          className="h-full w-full object-cover mask-[linear-gradient(90deg,black_70%,transparent)] max-lg:mask-none"
          src="/blocks-hero.png"
          alt="Close-up of concrete block textures and hollow-core construction"
          loading="lazy"
          width="1536"
          height="1024"
        />
        <span className="absolute bottom-6 left-[7vw] text-xs tracking-widest text-white/55">
          THE MATERIAL. UP CLOSE.
        </span>
      </div>
      <div className="px-[7vw] lg:px-0">
        <Eyebrow light>02 / Our approach</Eyebrow>
        <h2 className="my-8 text-[clamp(2.5rem,10vw,3rem)] sm:text-[clamp(3rem,4.6vw,4.7rem)] font-medium leading-[1.04] tracking-[-0.06em]">
          Great spaces
          <br />
          start with
          <br />
          <em className="text-white/55">the essentials.</em>
        </h2>
        <p className="max-w-sm text-base leading-7 text-white/55">
          Before the first wall. Before the finishing touches. There is a
          material choice that shapes everything that follows.
        </p>
        <p className="mt-5 max-w-sm text-base leading-7 text-white/55">
          At Airstone, that is where our story begins. With blocks made to
          become part of something bigger.
        </p>
        <Button className="mt-7" variant="outline" asChild>
          <a
            className="border-white/20 text-white hover:bg-white/10 hover:text-white"
            href="#materials"
          >
            Discover the collection <ArrowUpRight />
          </a>
        </Button>
      </div>
    </section>
  );
}
