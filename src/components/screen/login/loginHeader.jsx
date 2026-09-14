import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "@screenComponent/home/brand";
import { Button } from "@shadcnComponent/button";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

export default function LoginHeader() {
  return (
    <header className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-[5vw]">
      <Link to={NAVIGATION_ROUTES.HOME} aria-label="Airstone home">
        <Brand />
      </Link>
      <Button variant="ghost" asChild>
        <Link to={NAVIGATION_ROUTES.HOME}>
          <ArrowLeft /> Back to home
        </Link>
      </Button>
    </header>
  );
}
