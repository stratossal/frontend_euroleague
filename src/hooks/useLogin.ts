import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginResponse } from "@/api/authApi";
import type { LoginFields } from "@/schemas/login";

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginFields>({
        mutationFn: loginUser,
    });
}