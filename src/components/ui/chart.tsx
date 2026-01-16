import * as React from "react"
import * as Recharts from "recharts"
import { cn } from "@/lib/utils"

// Define ChartConfig interface since we're not importing it anymore
interface ChartConfig {
    [key: string]: {
        label?: string
        color?: string
    }
}

// Create a custom hook for chart context
const useChart = () => {
    return {
        config: {} as ChartConfig
    }
}

type TooltipContentProps = Recharts.TooltipProps<number, string> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
    labelClassName?: string
    active?: boolean
    payload?: Array<{
        dataKey?: string
        name?: string
        value?: number
        payload?: any
        color?: string
        fill?: string
        type?: string
    }>
}

export function ChartTooltipContent(props: TooltipContentProps) {
    const {
        hideLabel = false,
        hideIndicator = false,
        indicator = "dot",
        nameKey,
        labelKey,
        labelClassName,
        active,
        payload = []
    } = props

    const { config } = useChart()

    if (!active || !payload?.length) return null

    const tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload.length) return null
        const item = payload[0]
        const key = `${labelKey || item.dataKey || item.name || "value"}`
        const itemConfig = config[key]
        const value = itemConfig?.label
        if (!value) return null
        return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [payload, hideLabel, labelKey, config, labelClassName])

    return (
        <div className="border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
            {!hideLabel && tooltipLabel}
            <div className="grid gap-1.5">
                {payload
                    .filter((item) => item.type !== "none")
                    .map((item, index: number) => {
                        const key = `${nameKey || item.name || item.dataKey || "value"}`
                        const itemConfig = config[key]
                        const indicatorColor = item.payload?.fill || item.color

                        return (
                            <div key={item.dataKey || index} className="flex flex-1 justify-between leading-none items-center gap-2">
                                {!hideIndicator && (
                                    <div
                                        className={cn("shrink-0 rounded-[2px]", {
                                            "h-2.5 w-2.5": indicator === "dot",
                                            "w-1": indicator === "line",
                                        })}
                                        style={{ backgroundColor: indicatorColor }}
                                    />
                                )}
                                <div className="grid gap-1.5">
                                    <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                                    {item.value !== undefined && (
                                        <span className="text-foreground font-mono font-medium tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}