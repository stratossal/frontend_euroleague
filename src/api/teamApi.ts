import axiosInstance from "@/lib/axios";

export async function getTeams() {
    const response = await axiosInstance.get('/teams/');
    return response.data;
}

export async function getTeam(id: string) {
    const response = await axiosInstance.get(`/teams/${id}/`);
    return response.data;
}