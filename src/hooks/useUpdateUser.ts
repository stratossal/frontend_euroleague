import { useMutation, useQueryClient } from "@tanstack/react-query";
import {updateUser} from "@/api/authApi.ts";
import type { User } from "@/schemas/users.ts";

type UpdateUserPayload = {
    id: string;
    data: Partial<User>;
};

export function useUpdateUser(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({id,data}:UpdateUserPayload)=> updateUser(id,data),
        onSuccess: (_updatedUser,variables) => {
            queryClient.invalidateQueries({queryKey:["users"]})
            queryClient.invalidateQueries({queryKey:["users",variables.id]})
        }
    })
}