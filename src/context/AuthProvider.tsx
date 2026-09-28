import { useEffect, type ReactNode } from "react";
import type { LoginFields } from "@/schemas/login.ts";
import type { AuthUser } from "@/features/auth/authSlice";
import { login } from "@/services/api.login.ts";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies.ts";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "@/context/AuthContext.ts";
import {
  initializeAuth,
  loginSuccess,
  logout,
  setUser as setAuthUser,
} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

type JwtPayload = {
  email: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, accessToken, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = getCookie("access_token");
    const savedUser = localStorage.getItem("user");

    let parsedUser: AuthUser | null = null;

    if (savedUser) {
      try {
        parsedUser = JSON.parse(savedUser) as AuthUser;
      } catch (e) {
        console.warn("Invalid saved user:", e);
        localStorage.removeItem("user");
      }
    }

    if (!token) {
      dispatch(initializeAuth({ user: null, accessToken: null }));
      return;
    }

    try {
      jwtDecode<JwtPayload>(token);
      dispatch(initializeAuth({ user: parsedUser, accessToken: token }));
    } catch (e) {
      console.warn("Invalid JWT token:", e);
      deleteCookie("access_token");
      localStorage.removeItem("user");
      dispatch(logout());
    }
  }, [dispatch]);

  const loginUser = async (fields: LoginFields) => {
    const res = await login(fields);
    const token = res.token;
    const u = res.user;

    localStorage.setItem("user", JSON.stringify(u));

    setCookie("access_token", token, {
      expires: 1,
      sameSite: "Lax",
      secure: false,
      path: "/",
    });

    dispatch(loginSuccess({ user: u, accessToken: token }));
  };

  const logoutUser = () => {
    deleteCookie("access_token");
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const setUser = (newUser: AuthUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    dispatch(setAuthUser(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        loginUser,
        logoutUser,
        loading,
        user,
        setUser,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};