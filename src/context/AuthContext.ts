import {createContext} from "react";
import type {LoginFields} from "@/schemas/login.ts";

type AuthContextProps = {
    isAuthenticated: boolean
    accessToken: string | null
    loginUser: (fields: LoginFields) => Promise<void>
    logoutUser: () => void
    loading: boolean
    user: {
        firstname: string;
        lastname: string;
        email: string;
        country?: string;
        favTeam?: string;
    } | null;
    }

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)
