
import { useState } from "react";
import {
  CheckSquare,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-900">
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl md:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 text-white md:flex">
          <div className="absolute -right-16 top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-8 top-32 h-48 w-48 rounded-full border border-white/10" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <CheckSquare size={27} />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight">TaskFlow</p>
              <p className="text-sm text-blue-100">Plan less. Achieve more.</p>
            </div>
          </div>

          <div className="relative my-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm">
              <Sparkles size={16} />
              Your productivity, simplified
            </div>
            <h1 className="max-w-md text-4xl font-bold leading-tight lg:text-5xl">
              Make space for what matters.
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-blue-100">
              Organize your day, keep track of your priorities, and turn
              small steps into meaningful progress.
            </p>

            <div className="mt-8 space-y-4 text-sm text-blue-50">
              {[
                "Organize tasks and priorities",
                "Track progress with your dashboard",
                "Keep your schedule in view",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-blue-100">
            Built for your everyday wins.
          </p>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 md:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <CheckSquare size={24} />
              </div>
              <div>
                <p className="text-xl font-bold">TaskFlow</p>
                <p className="text-xs text-slate-500">Your productivity space</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <ShieldCheck size={17} />
                YOUR PERSONAL WORKSPACE
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                {mode === "login" ? "Welcome back!" : "Create your account"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {mode === "login"
                  ? "Sign in to continue where you left off."
                  : "Set up your account and start organizing your day."}
              </p>
            </div>

            {mode === "login" ? (
              <LoginForm onSwitch={() => setMode("register")} />
            ) : (
              <RegisterForm onSwitch={() => setMode("login")} />
            )}

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Demo authentication only. Do not use a real or reused password.
            </p>
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="absolute left-4 top-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
      >
        <ArrowLeft size={16} />
        {mode === "login" ? "Register" : "Login"}
      </button>
    </main>
  );
}

export default AuthPage;
