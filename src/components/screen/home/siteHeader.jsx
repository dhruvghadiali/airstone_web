import { useRef } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Brand } from "@screenComponent/home/brand";
import { Button } from "@shadcnComponent/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@shadcnComponent/sheet";

const navigation = [
  ["Materials", "#materials"],
  ["Our approach", "#approach"],
  ["Applications", "#applications"],
];

export function SiteHeader() {
  const navigatingRef = useRef(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-black/10 bg-[#f3f4ee]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-[5vw]">
        <a href="#home" aria-label="Airstone home">
          <Brand />
        </a>
        <nav
          className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/35 p-1 shadow-sm backdrop-blur-lg md:flex"
          aria-label="Main navigation"
        >
          {navigation.map(([label, href]) => (
            <Button key={label} variant="ghost" size="sm" asChild>
              <a href={href}>{label}</a>
            </Button>
          ))}
        </nav>
        <Button className="hidden md:inline-flex" asChild>
          <a href="#materials">
            Explore the range <ArrowUpRight />
          </a>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="md:hidden"
              variant="outline"
              size="icon"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="flex flex-col overflow-y-auto"
            onCloseAutoFocus={(event) => {
              if (navigatingRef.current) {
                event.preventDefault();
                navigatingRef.current = false;
              }
            }}
          >
            <div className="border-b border-black/10 pb-6 pr-10">
              <SheetTitle>Explore Airstone</SheetTitle>
              <SheetDescription className="mt-2">
                Building possibilities, block by block.
              </SheetDescription>
            </div>
            <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
              {navigation.map(([label, href], index) => (
                <SheetClose asChild key={label}>
                  <a
                    className="group flex items-center justify-between border-b border-black/10 py-5 text-xl font-medium tracking-[-0.03em]"
                    href={href}
                    onClick={() => { navigatingRef.current = true; }}
                  >
                    <span>
                      <small className="mr-4 text-xs font-normal text-[#929d86]">
                        0{index + 1}
                      </small>
                      {label}
                    </span>
                    <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
                  </a>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <a
                href="#materials"
                onClick={() => { navigatingRef.current = true; }}
                className="mt-auto flex shrink-0 items-center justify-between rounded-full bg-accent px-5 py-4 text-sm font-medium"
              >
                Explore the range <ArrowUpRight className="size-5" />
              </a>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
