import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/useAuth";
import { signUp } from "../services/auth.service";

const RegisterPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await signUp({
        name,
        email,
        password,
      });

      if (!data.session) {
        setSuccess(true);
        return;
      }

      navigate("/", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось создать аккаунт",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Проверьте email</h1>

          <p className="mt-3 text-sm leading-6">
            Письмо для подтверждения регистрации было отправлено на почту{" "}
            <span className="font-medium">{email}</span>.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block font-medium text-zinc-900 hover:underline"
          >
            Войти в аккаунт
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold mb-4">
          Создание аккаунта
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Имя
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Алексей"
              autoComplete="name"
              required
              className="w-full rounded-lg border px-3 py-2.5 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="register-email"
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
              htmlFor="register-password"
              className="mb-2 block text-sm font-medium"
            >
              Пароль
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Минимум 6 символов"
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full rounded-lg border px-3 py-2.5 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium"
            >
              Повторите пароль
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Повторите пароль"
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none"
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
            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 font-medium text-white"
          >
            {isSubmitting ? "Создание..." : "Создать аккаунт"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-zinc-900 hover:underline"
          >
            Войти в существующий аккаунт
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
