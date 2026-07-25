import { useMediaQuery } from "@mui/material";
import { InboundPalletDetailMobilePage } from "./page.mobile";

export const InboundPalletDetailPage = () => {
    const isSm = useMediaQuery((t) => t.breakpoints.down("md"));
    if (isSm) return <InboundPalletDetailMobilePage />;
    return null
};
