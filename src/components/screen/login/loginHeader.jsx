import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "@screenComponent/home/brand";
import { Button } from "@shadcnComponent/button";

export default function LoginHeader() {
  return (
    <header className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-[5vw]">
      <Link to="/" aria-label="Airstone home">
        <Brand />
      </Link>
      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft /> Back to home
        </Link>
      </Button>
    </header>
  );
}
