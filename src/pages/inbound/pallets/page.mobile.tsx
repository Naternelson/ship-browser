import { Box, Typography } from "@mui/material";
import { ActionbarMobile } from "./_components/Actionbar.mobile";
import { PalletListMobile } from "./_components/PalletList.mobile";
import { FilterBarMobile } from "./_components/FilterBar";
import { usePalletsPage } from "./_components/PageContext";

export const PalletsPageMobile = () => {
    const ctx = usePalletsPage();
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "0.5rem 1rem",
                    gap: "1rem",
                    alignItems: "center",
                }}>
                <Typography variant="subtitle1">Inbound Pallets</Typography>
                <Typography variant="caption">{ctx.displayRows.length.toLocaleString()} Results</Typography>
            </Box>
            <ActionbarMobile />
            <FilterBarMobile />
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
