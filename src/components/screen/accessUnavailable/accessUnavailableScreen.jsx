import { ShieldCheck } from "lucide-react";

export default function AccessUnavailableScreen() {
  return (
    <main className="grid min-h-[calc(100svh-4.5rem)] place-items-center px-[5vw] py-16 md:min-h-screen">
      <div className="max-w-lg text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-black/10 bg-[#f3f4ee] shadow-sm">
          <ShieldCheck className="size-6 text-[#67745d]" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Access unavailable
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
          Your workspace is being prepared
        </h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          Dashboard and Admin management are currently available only to Super Admin accounts.
        </p>
      </div>
    </main>
  );
}
