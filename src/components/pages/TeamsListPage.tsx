import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {getTeams} from "@/services/api.teams.ts";
import type {Team} from "@/schemas/teams.ts";
import {OrbitProgress} from "react-loading-indicators";


const TeamsListPage = () =>{
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        getTeams()
            .then((data)=>setTeams(data))
            .finally(()=>setLoading(false))

    },[])
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <OrbitProgress
                    color="#4F46E5"
                    size="large"
                />
            </div>
        );
    }


    return(
        <>

            <div className="p-8">
                <h1 className="text-3xl text-center font-bold text-gray-600 my-4 py-2 mt-10">
                    Teams
                </h1>
                <Table>
                    <TableCaption>A list of Euroleague Teams.</TableCaption>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Founded</TableHead>
                            <TableHead>Coach</TableHead>
                            <TableHead className="text-right">Position</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow key={team.teamId}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={team.logo}
                                            alt={team.name}
                                            className="w-8 h-8 object-contain rounded-full"
                                        />
                                        <span>{team.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="pl-8">{team.founded}</TableCell>
                                <TableCell>{team.coach}</TableCell>
                                <TableCell className="text-right">{team.standings.position}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
export default TeamsListPage;