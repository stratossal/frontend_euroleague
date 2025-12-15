import SwapVertIcon from "@mui/icons-material/SwapVert";
import { TableHead } from "@/components/ui/table";

interface SortableHeaderProps {
    label: string;
    sortKey: string;
    sortConfig: { key: string; direction: "asc" | "desc" } | null;
    onSort: (key: string) => void;
    align?: "left" | "right";
}

export const Sorting = ({
                            label,
                            sortKey,
                            sortConfig,
                            onSort,
                            align = "left",
                        }: SortableHeaderProps) => {
    const isActive = sortConfig?.key === sortKey;
    const direction = isActive ? sortConfig!.direction : null;

    return (
        <TableHead
            className={`cursor-pointer select-none px-4 ${align === "right" ? "text-right" : "text-left"}`}
            onClick={() => onSort(sortKey)}
        >
            <div className={`flex items-center gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}>
                <span>{label}</span>
                <SwapVertIcon
                    fontSize="small"
                    className={`${
                        isActive
                            ? "text-black"
                            : "text-gray-400"
                    } ${isActive && direction === "desc" ? "rotate-180" : ""}`}
                />
            </div>
        </TableHead>
    );
};
