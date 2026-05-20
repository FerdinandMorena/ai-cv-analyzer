import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="app-bg min-h-screen flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-sm animate-in fade-in duration-500"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          borderRadius: "1.25rem",
          boxShadow: "0 8px 48px rgba(0, 0, 0, 0.4)",
        }}
      >
        <section className="flex flex-col gap-7 p-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
            >
              <span className="text-white font-bold text-lg">R</span>
            </div>
            {/* Override global h1 white color since this is inside white card */}
            <h1
              style={{
                color: "#0f172a",
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              }}
            >
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Log in to continue your job journey
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {isLoading ? (
              <button className="auth-button animate-pulse" disabled>
                Signing you in…
              </button>
            ) : auth.isAuthenticated ? (
              <button className="auth-button" onClick={auth.signOut}>
                Log Out
              </button>
            ) : (
              <button className="auth-button" onClick={auth.signIn}>
                Log In with Puter
              </button>
            )}
            <p className="text-center text-xs text-slate-400">
              Powered by Puter — your data stays private
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
