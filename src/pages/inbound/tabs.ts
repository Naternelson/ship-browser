import { Home, Inventory2, Pallet } from "@mui/icons-material";
import type { SvgIconProps } from "@mui/material";
import type { ComponentType } from "react";

type Tab = {
    id: string;
    label: string;
    path: string;
    disabled?: boolean;
    icon?: ComponentType<SvgIconProps>;
};

export const defaultTabs: Tab[] = [
    {
        id: "overview",
        label: "Overview",
        path: ".",
        icon: Home,
    },
    {
        id: "pallets",
        label: "Pallets",
        path: "pallets",
        icon: Pallet,
    },
    {
        id: "items",
        label: "SKUs",
        path: "skus",
        icon: Inventory2,
    },
];
