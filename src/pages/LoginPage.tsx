import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { signIn } from "../services/auth.service";

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await signIn(email, password);

      const from =
        (location.state as { from?: { pathname: string } })?.from?.pathname ??
        "/";

      navigate(from, { replace: true });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось выполнить вход",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ">
        <h1 className="text-center text-2xl font-bold mb-4 text-zinc-900">
          Войдите в свой аккаунт
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border px-3 py-2.5 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Пароль
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите пароль"
              autoComplete="current-password"
              required
              minLength={6}
              className="w-full rounded-lg border px-3 py-2.5 outline-none"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Войти
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link to="/register" className="font-medium hover:underline">
            Зарегистрировать новый аккаунт
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
