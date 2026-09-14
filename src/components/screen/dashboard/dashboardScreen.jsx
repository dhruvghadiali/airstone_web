import _ from "lodash";
import { useSelector } from "react-redux";

import { selectAuthUsername } from "@redux/auth/auth.selector";

export default function DashboardScreen() {
  const username = useSelector(selectAuthUsername);

  return (
    <main className="grid min-h-[calc(100svh-4.5rem)] place-items-center px-[5vw] py-12 text-center text-foreground md:min-h-screen">
      <h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl lg:text-6xl">
        Welcome{!_.isEmpty(username) ? `, ${username}` : ""}.
      </h1>
    </main>
  );
}
