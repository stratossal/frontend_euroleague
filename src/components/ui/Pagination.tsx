"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import type { Player } from "@/schemas/players.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useNavigate} from "react-router";

interface PaginationProps {
    players: Player[];
    itemsPerPage?: number;
}


export function Pagination({ players, itemsPerPage = 5 }: PaginationProps) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = players.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(players.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % players.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    return (
        <div>
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[200px]">Player</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead className="text-right">PPG</TableHead>
                        <TableHead className="text-right">RPG</TableHead>
                        <TableHead className="text-right">APG</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((player) => (
                        <TableRow key={player.playerId}
                                  className="hover:bg-gray-50 cursor-pointer"
                                  onClick={() => navigate(`/players/${player._id}`)}
                        >
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-sm">
                                        {player.jerseyNumber || "00"}
                                    </div>
                                    <span>{player.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                                    {player.position}
                                </span>
                            </TableCell>
                            <TableCell>{player.team}</TableCell>
                            <TableCell>{player.age}</TableCell>
                            <TableCell className="text-right font-semibold">
                                {player.stats.pointsPerGame}
                            </TableCell>
                            <TableCell className="text-right">
                                {player.stats.reboundsPerGame}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                {player.stats.assistsPerGame}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-6 px-4">
                <div className="text-sm text-gray-600">
                    Page <span className="font-semibold">{currentPage + 1}</span> of{" "}
                    <span className="font-semibold">{pageCount}</span> |{" "}
                    Showing <span className="font-semibold">{itemOffset + 1}</span>-<span className="font-semibold">
                        {Math.min(endOffset, players.length)}
                    </span> of <span className="font-semibold">{players.length}</span> players
                </div>

                <ReactPaginate
                    breakLabel={
                        <span className="px-3 py-2 text-gray-500 cursor-default">...</span>
                    }
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
                    previousClassName=""
                    nextClassName=""
                    disabledClassName="opacity-50 cursor-not-allowed"
                    disabledLinkClassName="hover:!bg-white hover:!text-gray-700 cursor-not-allowed"
                    forcePage={currentPage}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}