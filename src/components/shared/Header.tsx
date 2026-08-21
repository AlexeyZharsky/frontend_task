import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";
import { signOut } from "../../services/auth.service";

const Header = () => {
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await signOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-xl font-bold text-zinc-900">
          TaskFlow
        </Link>

        <div className="flex items-center gap-3">
          {user?.email}

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
