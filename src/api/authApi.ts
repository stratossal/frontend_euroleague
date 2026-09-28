import axiosInstance from "@/lib/axios";
import type { LoginFields } from "@/schemas/login";
import type {User} from "@/schemas/users.ts";

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    user?: {
        id: string;
        email: string;
    };
}

export async function loginUser(data: LoginFields): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
    return response.data;
}

export async function updateUser(id:string,data:Partial<User>){
    const res = await axiosInstance.put<LoginResponse>(`/users/${id}/`, data);
    return res.data;
}