import { Box } from "@mui/material";
import { useId } from "react";

type PalletDiagramProps = {
    ti: number;
    hi: number;
    width?: number;
    height?: number;
};

type Point = {
    x: number;
    y: number;
};

export const PalletDiagram = ({ ti, hi, width = 320, height = 260 }: PalletDiagramProps) => {
    const gradientId = useId();

    const safeTi = Math.max(1, Math.min(ti, 20));
    const safeHi = Math.max(1, Math.min(hi, 12));

    /*
     * We approximate TI as a rectangular layer.
     * For example:
     * TI 10 => 5 columns × 2 rows
     * TI 12 => 4 columns × 3 rows
     */
    const { columns, rows } = getLayerLayout(safeTi);

    const caseWidth = 28;
    // const caseDepth = 14;
    const caseHeight = 18;

    const depthX = 9;
    const depthY = -6;

    const layerWidth = columns * caseWidth;
    const layerDepthX = rows * depthX;
    const layerDepthY = rows * depthY;

    const totalStackHeight = safeHi * caseHeight;

    const originX = (width - layerWidth - layerDepthX) / 2;
    const originY = height - 44 - Math.max(0, layerDepthY) - totalStackHeight;

    const cases = [];

    for (let layer = 0; layer < safeHi; layer++) {
        for (let index = 0; index < safeTi; index++) {
            const column = index % columns;
            const row = Math.floor(index / columns);

            if (row >= rows) continue;

            const x = originX + column * caseWidth + row * depthX;

            const y = originY + (safeHi - layer - 1) * caseHeight + row * depthY;

            cases.push(
                <CaseBox
                    key={`${layer}-${index}`}
                    x={x}
                    y={y}
                    width={caseWidth}
                    height={caseHeight}
                    depthX={depthX}
                    depthY={depthY}
                    gradientId={gradientId}
                />,
            );
        }
    }

    const palletY = originY + totalStackHeight + layerDepthY + 6;

    return (
        <Box
            component="svg"
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`Pallet configuration with TI ${safeTi} and HI ${safeHi}`}
            sx={{
                display: "block",
                width: "100%",
                maxWidth: width,
                height: "auto",
            }}>
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
                </linearGradient>
            </defs>

            <g>{cases}</g>

            <PalletBase x={originX - 8} y={palletY} width={layerWidth + layerDepthX + 16} depthX={14} depthY={-8} />

            <text x={width / 2} y={height - 12} textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="700">
                TI {safeTi} × HI {safeHi}
            </text>
        </Box>
    );
};

type CaseBoxProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    depthX: number;
    depthY: number;
    gradientId: string;
};

const CaseBox = ({ x, y, width, height, depthX, depthY, gradientId }: CaseBoxProps) => {
    const front: Point[] = [
        { x, y },
        { x: x + width, y },
        { x: x + width, y: y + height },
        { x, y: y + height },
    ];

    const top: Point[] = [
        { x, y },
        { x: x + depthX, y: y + depthY },
        {
            x: x + width + depthX,
            y: y + depthY,
        },
        { x: x + width, y },
    ];

    const side: Point[] = [
        { x: x + width, y },
        {
            x: x + width + depthX,
            y: y + depthY,
        },
        {
            x: x + width + depthX,
            y: y + height + depthY,
        },
        { x: x + width, y: y + height },
    ];

    return (
        <g>
            <polygon
                points={toPoints(top)}
                fill="currentColor"
                fillOpacity="0.28"
                stroke="currentColor"
                strokeOpacity="0.45"
                strokeWidth="0.75"
            />

            <polygon
                points={toPoints(side)}
                fill="currentColor"
                fillOpacity="0.42"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="0.75"
            />

            <polygon
                points={toPoints(front)}
                fill={`url(#${gradientId})`}
                stroke="currentColor"
                strokeOpacity="0.55"
                strokeWidth="0.75"
            />
        </g>
    );
};

type PalletBaseProps = {
    x: number;
    y: number;
    width: number;
    depthX: number;
    depthY: number;
};

const PalletBase = ({ x, y, width, depthX, depthY }: PalletBaseProps) => {
    return (
        <g fill="none" stroke="currentColor" strokeOpacity="0.65" strokeWidth="3" strokeLinecap="round">
            <line x1={x} y1={y} x2={x + width} y2={y} />

            <line x1={x + depthX} y1={y + depthY} x2={x + width + depthX} y2={y + depthY} />

            <line x1={x} y1={y} x2={x + depthX} y2={y + depthY} />

            <line x1={x + width} y1={y} x2={x + width + depthX} y2={y + depthY} />

            <line x1={x + width * 0.2} y1={y + 2} x2={x + width * 0.2} y2={y + 10} />

            <line x1={x + width * 0.5} y1={y + 2} x2={x + width * 0.5} y2={y + 10} />

            <line x1={x + width * 0.8} y1={y + 2} x2={x + width * 0.8} y2={y + 10} />
        </g>
    );
};

const getLayerLayout = (
    ti: number,
): {
    columns: number;
    rows: number;
} => {
    const columns = Math.ceil(Math.sqrt(ti));
    const rows = Math.ceil(ti / columns);

    return { columns, rows };
};

const toPoints = (points: Point[]) => points.map(({ x, y }) => `${x},${y}`).join(" ");
