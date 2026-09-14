import _ from "lodash";
import {
  Activity,
  Boxes,
  Factory,
  LogOut,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Brand } from "@screenComponent/home/brand";
import { Button } from "@shadcnComponent/button";
import { ROLE_OPTIONS } from "@enum/roles";
import { loggedOut } from "@redux/auth/auth.action";
import { selectAuth } from "@redux/auth/auth.selector";
import { getTokenExpiration } from "@routes/auth-token.util";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

const operationalAreas = Object.freeze([
  {
    title: "Production",
    description: "Monitor block output and active manufacturing runs.",
    icon: Factory,
  },
  {
    title: "Inventory",
    description: "Track available blocks, materials, and storage levels.",
    icon: Boxes,
  },
  {
    title: "Dispatch",
    description: "Follow orders prepared for delivery across project sites.",
    icon: Truck,
  },
]);

export default function DashboardScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, role, token } = useSelector(selectAuth);
  const roleLabel = _.find(ROLE_OPTIONS, { value: role })?.label ?? "Team member";
  const expiresAt = getTokenExpiration(token);
  const expiryLabel = expiresAt
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(expiresAt)
    : "Managed by the server";

  const handleLogout = () => {
    dispatch(loggedOut());
    navigate(NAVIGATION_ROUTES.HOME, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3f4ee]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-[5vw]">
          <Brand />
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-black/10 bg-white/45 px-4 py-2 text-sm text-muted-foreground sm:inline-flex">
              {roleLabel}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut /> Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-[5vw] py-10 sm:py-14">
        <section className="overflow-hidden rounded-[2rem] bg-[#292d27] px-6 py-9 text-white shadow-[0_30px_80px_rgba(41,45,39,0.16)] sm:px-10 sm:py-12 lg:px-14">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#aeb9a6]">
                Manufacturing dashboard
              </p>
              <h1 className="max-w-3xl text-4xl font-medium tracking-[-0.05em] sm:text-6xl">
                Welcome back{username ? `, ${username}` : ""}.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                Your Airstone workspace is ready for production, inventory, and dispatch operations.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent text-white">
                <Activity className="size-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-white/45">Session</p>
                <p className="mt-0.5 text-sm font-medium">Active and secure</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {_.map(operationalAreas, ({ title, description, icon: Icon }, index) => (
            <article
              className="group rounded-[1.5rem] border border-black/10 bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
              key={title}
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary">
                  <Icon className="size-5" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">0{index + 1}</span>
              </div>
              <h2 className="mt-8 text-2xl font-medium tracking-[-0.04em]">{title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[1.5rem] border border-black/10 bg-card p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Workspace status
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-[#dce7d4] text-[#41543a]">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <h2 className="text-xl font-medium">Authenticated access</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your local session has been restored to Redux and is ready to use.
                </p>
              </div>
            </div>
          </article>
          <article className="rounded-[1.5rem] border border-black/10 bg-[#d8ddd2] p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Access details
            </p>
            <dl className="mt-7 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-5 border-b border-black/10 pb-4">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="font-medium">{roleLabel}</dd>
              </div>
              <div className="flex items-center justify-between gap-5">
                <dt className="text-muted-foreground">Token expiry</dt>
                <dd className="text-right font-medium">{expiryLabel}</dd>
              </div>
            </dl>
          </article>
        </section>
      </main>
    </div>
  );
}
