import LoginForm from "@screenComponent/login/form/loginForm";
import LoginHeader from "@screenComponent/login/loginHeader";
import LoginWelcomePanel from "@screenComponent/login/loginWelcomePanel";

export default function LoginScreen() {
  return (
    <main className="min-h-screen bg-background text-[#292d27]">
      <LoginHeader />
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1600px] items-stretch px-[5vw] pb-[5vw] lg:grid-cols-[1.05fr_0.95fr]">
        <LoginWelcomePanel />
        <LoginForm />
      </section>
    </main>
  );
}
