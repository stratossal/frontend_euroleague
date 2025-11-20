import * as d3 from "d3";
import type { FeatureCollection } from "geojson";
import type { Team } from "@/schemas/teams.ts";
import { useState } from "react";

type MapProps = {
    width: number;
    height: number;
    data: FeatureCollection;
    teams: Team[];
    cityCoordinates: Record<string, [number, number]>;
};

export const EuropeMap = ({ width, height, data, teams, cityCoordinates }: MapProps) => {
    const [hoveredTeam, setHoveredTeam] = useState<Team | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<[number, number]>([0, 0]);

    const projection = d3.geoMercator()
        .scale(600)
        .center([20, 50])
        .translate([width / 2, height / 2]);

    const geoPathGenerator = d3.geoPath().projection(projection);


    const getTeamCoordinates = (team: Team): [number, number] | null => {
        const baseCoords = cityCoordinates[team.city];
        if (!baseCoords) return null;


        const cityTeams: Record<string, string[]> = {
            "Istanbul": ["Fenerbahce", "Anadolu Efes"],
            "Belgrade": ["Partizan", "Crvena Zvezda"],
            "Athens": ["Panathinaikos", "Olympiacos"],
            "Piraeus": ["Olympiacos"]
        };

        const teamsInCity = cityTeams[team.city];
        if (!teamsInCity) return baseCoords;

        const teamIndex = teamsInCity.findIndex(name =>
            team.name.toLowerCase().includes(name.toLowerCase())
        );

        if (teamIndex === -1) return baseCoords;


        const [lon, lat] = baseCoords;
        const offset = (teamIndex - 0.5) * 0.3;
        return [lon + offset, lat + offset];
    };

    const allSvgPaths = data.features.map(shape => {
        const pathD = geoPathGenerator(shape) || "";
        return (
            <path
                key={shape.id}
                d={pathD}
                stroke="#555"
                fill="#e2e8f0"
                strokeWidth={0.5}
            />
        );
    });

    const handleMouseMove = (event: React.MouseEvent<SVGCircleElement>, team: Team) => {
        const svg = event.currentTarget.ownerSVGElement;
        if (!svg) return;

        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const cursorPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

        setTooltipPosition([cursorPoint.x, cursorPoint.y]);
        setHoveredTeam(team);
    };

    const teamPoints = teams.map(team => {
        const coords = getTeamCoordinates(team);
        if (!coords) return null


        const point = projection(coords);
        if (!point) return null;

        const [x, y] = point;

        return (
            <circle
                key={team.teamId}
                cx={x}
                cy={y}
                r={8}
                fill="#dc2626"
                stroke="#000"
                strokeWidth={1.5}
                onMouseEnter={(e) => handleMouseMove(e, team)}
                onMouseMove={(e) => handleMouseMove(e, team)}
                onMouseLeave={() => setHoveredTeam(null)}
                style={{ cursor: 'pointer' }}
            />
        );
    }).filter(Boolean);

    return (
        <div className="relative">
            <svg width={width} height={height}>
                {allSvgPaths}
                {teamPoints}

                {hoveredTeam && (
                    <text
                        x={tooltipPosition[0] + 10}
                        y={tooltipPosition[1] - 10}
                        fontSize="12"
                        fontWeight="bold"
                        fill="#000"
                        className="pointer-events-none"
                    >
                        {hoveredTeam.name}
                    </text>
                )}
            </svg>
        </div>
    );
};

export default EuropeMap;