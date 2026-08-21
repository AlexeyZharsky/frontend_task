import Header from "../components/shared/Header";
import { useAuth } from "../providers/useAuth";

const formatDate = (date: string | undefined) => {
  if (!date) {
    return "Не указано";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(date));
};

const ProfilePage = () => {
  const { user } = useAuth();

  const userName =
    typeof user?.user_metadata?.name === "string"
      ? user.user_metadata.name
      : "Не указано";

  return (
    <main className="min-h-screen bg-zinc-100">
      <Header />

      <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 mx-auto mt-3 max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold text-zinc-800">Профиль</h1>

        <dl className="mt-6 divide-y divide-zinc-100">
          <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-zinc-500">Имя</dt>
            <dd className="text-sm text-zinc-900 sm:col-span-2">{userName}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-zinc-500">Email</dt>
            <dd className="text-sm text-zinc-900 sm:col-span-2">
              {user?.email ?? "Не указано"}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-zinc-500">Телефон</dt>
            <dd className="text-sm text-zinc-900 sm:col-span-2">
              {user?.phone || "Не указано"}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-zinc-500">
              Дата регистрации
            </dt>
            <dd className="text-sm text-zinc-900 sm:col-span-2">
              {formatDate(user?.created_at)}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-zinc-500">
              Последний вход
            </dt>
            <dd className="text-sm text-zinc-900 sm:col-span-2">
              {formatDate(user?.last_sign_in_at)}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default ProfilePage;
