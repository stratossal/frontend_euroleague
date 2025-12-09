import {useEffect, useState} from "react";
import type {LoginFields} from "@/schemas/login.ts";
import {login} from "@/services/api.login.ts";
import {deleteCookie, getCookie, setCookie} from "@/utils/cookies.ts";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "@/context/AuthContext.ts";


type JwtPayload = {
    email: string;
    firstname: string;
    lastname: string;
}

export const AuthProvider = ({children}: {children: React.ReactNode})=>{
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<{ firstname: string; lastname: string } | null>(null);


    useEffect(() => {
        const token = getCookie("access_token");
        setAccessToken(token ?? null);

        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                console.log("Decoded JWT:", decoded);
                setUser({
                    firstname: decoded.firstname,
                    lastname: decoded.lastname
                });
            } catch (e) {
                console.warn("Invalid JWT token:", e);
                deleteCookie("access_token");
                setAccessToken(null);
                setUser(null);
            }
        }
        setLoading(false);
    }, []);


    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields);
        const token = res.token;
        setCookie("access_token", token, {
            expires: 1,
            sameSite: "Lax",
            secure: false,
            path: "/"
        });
        setAccessToken(token);

        // decode token και set user
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            setUser({
                firstname: decoded.firstname,
                lastname: decoded.lastname
            });
        } catch (e) {
            console.warn("Invalid JWT token:", e);
            deleteCookie("access_token");
            setAccessToken(null);
            setUser(null);
        }
    };



    const logoutUser = () => {
        deleteCookie("access_token");
        setAccessToken(null);
        setUser(null);
    }

    return (
        <>
            <AuthContext.Provider
                value={{
                    isAuthenticated: !!accessToken,
                    accessToken,
                    loginUser,
                    logoutUser,
                    loading,
                    user
                }}>
                { loading ? null : children }
            </AuthContext.Provider>
        </>
    )
}