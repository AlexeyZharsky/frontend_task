import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
