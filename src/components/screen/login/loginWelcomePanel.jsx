export default function LoginWelcomePanel() {
  return (
    <div className="relative hidden overflow-hidden rounded-4xl bg-[#292d27] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
      <div className="absolute -right-6 -top-6 size-48 rounded-full bg-accent" />
      <p className="relative text-sm font-medium uppercase tracking-[0.18em] text-white/60">
        Built to last
      </p>
      <div className="relative max-w-xl">
        <p className="mb-6 text-lg leading-relaxed text-white/65">
          Your projects, material selections, and conversations—all in one
          thoughtfully designed space.
        </p>
        <h1 className="text-5xl font-medium leading-[0.98] tracking-[-0.055em] xl:text-7xl">
          Welcome back to better building.
        </h1>
      </div>
    </div>
  );
}
