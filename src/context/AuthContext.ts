import { createContext } from "react";
import type { LoginFields } from "@/schemas/login.ts";
import type { AuthUser } from "@/features/auth/authSlice";

type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  loginUser: (fields: LoginFields) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);