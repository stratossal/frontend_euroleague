import {createContext} from "react";
import type {LoginFields} from "@/schemas/login.ts";
import type {User} from "@/schemas/users.ts";

type AuthContextProps = {
    isAuthenticated: boolean
    accessToken: string | null
    loginUser: (fields: LoginFields) => Promise<void>
    logoutUser: () => void
    loading: boolean,
    user: User,
    setUser: (user: User) => void;
    }

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)
