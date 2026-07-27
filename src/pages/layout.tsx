import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router";
import { theme } from "./theme";
import { Appbar } from "./_components/Appbar";
import { PrimarySidebar } from "./_components/PrimarySidebar";
import { navigation } from "../navigation/navigation";
import { MobileNavigation } from "./_components/PrimarySidebar/MobileNavigation";
import { useState } from "react";

export const Layout = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <InnerLayout />
        </ThemeProvider>
    );
};

const InnerLayout = () => {
    const smScreen = useMediaQuery((t) => t.breakpoints.down("md"));
    return (
        <>
            {!!smScreen && <MobileLayout />}
            {!smScreen && <DesktopLayout />}
        </>
    );
};

const MobileLayout = () => {
    const [open, setOpen] = useState(false);
    const onOpen = (state: boolean) => {
        setOpen(state);
    };
    return (
        <Box sx={{ height: "100svh", minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <MobileNavigation onChangeEvent={onOpen} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: 0,
                    overflow: "hidden",
                    transform: open ? "scale(.99)" : undefined,
                    transformOrigin: "right center",
                    filter: open ? "blur(1px)" : undefined,
                    transitionProperty: "filter transform",
                    transition: "150ms ease-out",
                }}>
                <Outlet />
            </Box>
        </Box>
    );
};

const DesktopLayout = () => {
    return (
        <Box sx={{ height: "100vh", minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Appbar />
            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, minHeight: "0", overflow: "hidden" }}>
                <PrimarySidebar navigationConfig={navigation} />
                <Outlet />
            </Box>
        </Box>
    );
};
