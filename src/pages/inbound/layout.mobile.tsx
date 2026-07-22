import { Box } from "@mui/material";
import { TabbarMobile } from "./_components/Tabbar.mobile";
import { Outlet } from "react-router";

export const LayoutMobile = () => {
    return (
        <Box
            sx={{
                flex: 1,

                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                minHeight: 0,
                position: "relative",
            }}>
            <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0, display: "flex", flexDirection: "column" }}>
                <Outlet />
            </Box>
            <TabbarMobile />
        </Box>
    );
};
