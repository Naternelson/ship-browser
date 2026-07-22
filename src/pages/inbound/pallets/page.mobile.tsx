import { Box } from "@mui/material";
import { ActionbarMobile } from "./_components/Actionbar.mobile";
import { PalletListMobile } from "./_components/PalletList.mobile";

export const PalletsPageMobile = () => {
    return (
        <Box
            sx={{
                position: "relative",
                flex: 1,
                overflow: "hidden",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
            }}>
            <ActionbarMobile />
            <Box
                sx={{
                    flex: 1,
                    overflow: "auto",
                    "& *": {
                        boxSizing: "border-box",
                    },
                }}>
                <PalletListMobile />
            </Box>
        </Box>
    );
};
