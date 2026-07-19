import { Box, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router";

export const Layout = () => {
    return (
        <Box
            sx={{
                flex: 1,
                outlineOffset: "-2px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                minHeight: 0,
            }}>
            <Tabbar />
            <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0, display: "flex", flexDirection: "column" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

type Tab = {
    id: string;
    label: string;
    path: string;
    disabled?: boolean;
};

const defaultTabs: Tab[] = [
    {
        id: "overview",
        label: "Overview",
        path: ".",
    },
    {
        id: "pallets",
        label: "Pallets",
        path: "pallets",
    },
];

const Tabbar = () => {
    const tabs = defaultTabs;
    return (
        <Box sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider", paddingX: "1rem" }}>
            {tabs.map((tab) => (
                <Box
                    component={NavLink}
                    key={tab.id}
                    to={tab.path}
                    end={tab.path === "."}
                    sx={{
                        display: "inline-block",
                        p: 1,
                        px: 2,
                        fontWeight: "bold",
                        textDecoration: "none",
                        color: "text.secondary",
                        "&:hover": {
                            color: "text.primary",
                        },
                        "&.active": {
                            color: "text.primary",
                            borderBottom: 2,
                            borderColor: "secondary.main",
                        },
                    }}>
                    <Typography variant="overline">{tab.label}</Typography>
                </Box>
            ))}
        </Box>
    );
};
