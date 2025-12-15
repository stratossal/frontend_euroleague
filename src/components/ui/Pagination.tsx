import { useState } from "react";
import ReactPaginate from "react-paginate";
import type { Player } from "@/schemas/players.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
import { Sorting } from "@/components/ui/Sorting";

interface PaginationProps {
    players: Player[];
    itemsPerPage?: number;
}

export function Pagination({ players, itemsPerPage = 5 }: PaginationProps) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: "asc" | "desc";
    } | null>(null);

    const navigate = useNavigate();

    const sortedPlayers = [...players].sort((a, b) => {
        if (!sortConfig) return 0;

        const aValue = sortConfig.key
            .split(".")
            .reduce((obj, key) => obj?.[key], a);
        const bValue = sortConfig.key
            .split(".")
            .reduce((obj, key) => obj?.[key], b);

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = sortedPlayers.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(players.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % players.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    const requestSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        setItemOffset(0);
        setCurrentPage(0);
    };

    const columns = [
        {
            label: "Player",
            key: "name",
            sortable: false,
            width: "w-[200px]",
            align: "left"
        },
        {
            label: "Position",
            key: "position",
            sortable: false,
            width: "w-[100px]",
            align: "left"
        },
        {
            label: "Team",
            key: "team",
            sortable: false,
            width: "w-[150px]",
            align: "left"
        },
        {
            label: "Age",
            key: "age",
            sortable: true,
            width: "w-[60px]",
            align: "right"
        },
        {
            label: "PPG",
            key: "stats.pointsPerGame",
            sortable: true,
            width: "w-[60px]",
            align: "right"
        },
        {
            label: "RPG",
            key: "stats.reboundsPerGame",
            sortable: true,
            width: "w-[60px]",
            align: "right"
        },
        {
            label: "APG",
            key: "stats.assistsPerGame",
            sortable: true,
            width: "w-[60px]",
            align: "right"
        },
    ];

    return (
        <>
            <div>
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            {columns.map((col) =>
                                col.sortable ? (
                                    <Sorting
                                        key={col.key}
                                        label={col.label}
                                        sortKey={col.key}
                                        sortConfig={sortConfig}
                                        onSort={requestSort}
                                        align={col.align}
                                    />
                                ) : (
                                    <TableHead
                                        key={col.key}
                                        className={`${col.width} px-4 ${
                                            col.align === "right"
                                                ? "text-right"
                                                : "text-left"
                                        }`}
                                    >
                                        <div className={`flex ${col.align === "right" ? "justify-end" : "justify-start"}`}>
                                            {col.label}
                                        </div>
                                    </TableHead>
                                )
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentItems.map((player) => (
                            <TableRow
                                key={player.playerId}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => navigate(`/players/${player._id}`)}
                            >
                                <TableCell className="font-medium w-[200px] px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-sm">
                                            {player.jerseyNumber || "00"}
                                        </div>
                                        <span>{player.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="w-[100px] px-4">{player.position}</TableCell>
                                <TableCell className="w-[150px] px-4">{player.team}</TableCell>
                                <TableCell className="text-right w-[60px] px-4">{player.age}</TableCell>
                                <TableCell className="text-right w-[60px] px-4 font-semibold">
                                    {player.stats.pointsPerGame}
                                </TableCell>
                                <TableCell className="text-right w-[60px] px-4">{player.stats.reboundsPerGame}</TableCell>
                                <TableCell className="text-right w-[60px] px-4 font-semibold">
                                    {player.stats.assistsPerGame}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* PAGINATION */}
                <div className="flex items-center justify-between mt-6 px-4">
                    <div className="text-sm text-gray-600">
                        Page <span className="font-semibold">{currentPage + 1}</span> of{" "}
                        <span className="font-semibold">{pageCount}</span> | Showing{" "}
                        <span className="font-semibold">{itemOffset + 1}</span>-
                        <span className="font-semibold">{Math.min(endOffset, players.length)}</span>{" "}
                        of <span className="font-semibold">{players.length}</span> players
                    </div>

                    <ReactPaginate
                        breakLabel={<span className="px-3 py-2 text-gray-500 cursor-default">...</span>}
                        nextLabel={
                            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer">
                                Next
                            </div>
                        }
                        previousLabel={
                            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer">
                                Previous
                            </div>
                        }
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        containerClassName="flex items-center space-x-2"
                        pageLinkClassName="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors min-w-[40px] cursor-pointer"
                        activeLinkClassName="!bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700 hover:!text-white"
                        breakClassName="flex items-center cursor-default"
                        disabledClassName="opacity-50 cursor-not-allowed"
                        forcePage={currentPage}
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </>
    )
}
