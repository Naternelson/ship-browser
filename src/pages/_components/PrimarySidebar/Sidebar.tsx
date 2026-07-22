import { useMediaQuery } from "@mui/material";
import { MobileNavigation } from "./MobileNavigation";

export const Sidebar = () => {
    const smScreen = useMediaQuery((t) => t.breakpoints.down("md"));
    if (smScreen) return <MobileNavigation />;
};
