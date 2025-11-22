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
import type { FeatureCollection } from "geojson";
import EuropeMap from "@/components/map/EuropeMap.tsx";
import {useNavigate} from "react-router";



const cityCoordinates: Record<string, [number, number]> = {
    "Madrid": [-3.7038, 40.4168],
    "Barcelona": [2.1734, 41.3851],
    "Piraeus": [23.6466, 37.9520],
    "Athens": [24.9175, 37.9738],
    "Berlin": [13.4050, 52.5200],
    "Munich": [11.5820, 48.1351],
    "Istanbul": [28.9684, 41.0182],
    "Belgrade": [20.4389, 44.7966],
    "Kaunas": [23.9036, 54.8985],
    "Bologna": [11.3326, 44.5049],
    "Milan": [9.1900, 45.4642],
    "Tel Aviv": [34.7818, 32.0853],
    "Paris": [2.3522, 48.8566],
    "Monaco": [7.4246, 43.7384],
    "Valencia": [-0.3774, 39.4699],
    "Vitoria-Gasteiz": [-2.6724, 42.8467],
    "Villeurbanne": [4.8795, 45.7719]
};

const TeamsListPage = () =>{
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [europeGeoJson, setEuropeGeoJson] = useState<FeatureCollection | null>(null);
    const [mapLoading, setMapLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(()=>{
        getTeams()
            .then((data)=>setTeams(data))
            .finally(()=>setLoading(false))

    },[])
    useEffect(() => {
        setMapLoading(true);
        fetch("/maps/custom.geo.json")
            .then(res => res.json())
            .then(data => {
                setEuropeGeoJson(data);
                setMapLoading(false);
            })
            .catch(() => setMapLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <OrbitProgress
                    color="#4F46E5"
                    size="large"
                />
            </div>
        )
    }
    return(
        <>
            <div className="p-8">
                <h1 className="text-3xl text-center font-bold text-gray-600 my-4 py-2 mt-10">
                    Teams
                </h1>
                <Table className="border-2">
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
                            <TableRow key={team.teamId}
                                      className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                                      onClick={()=> navigate(`/teams/${team._id}`)}>
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

            <div className="mt-12 ">
                <h2 className="text-2xl text-center font-bold text-gray-600 my-6">
                    Team Performance Map
                </h2>
                {mapLoading ? (
                    <div className="flex items-center justify-center" style={{ height: 700 }}>
                        <OrbitProgress color="#4F46E5" size="medium" />
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                    <EuropeMap
                        width={1000}
                        height={700}
                        data={europeGeoJson!}
                        teams={teams}
                        cityCoordinates={cityCoordinates}
                    />
                    </div>
                )}
            </div>

        </>
    )
}
export default TeamsListPage;