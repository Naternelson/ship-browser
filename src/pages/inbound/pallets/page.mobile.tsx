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
                flexDirection: { xs: "column", sm: "row", md: "column" },
            }}>
            <ActionbarMobile />
            <Box
                sx={{
                    paddingTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: (t) => t.alpha(t.palette.primary.dark, 0.1),
                    maxWidth: {
                        xs: "100%",
                        sm: "50%",
                        md: "100%",
                    },
                    borderBottomWidth: { xs: 1, sm: 0, md: 1 },
                    borderBottomStyle: "solid",
                    borderBottomColor: "divider",

                    borderRightWidth: { xs: 0, sm: 1, md: 0 },
                    borderRightStyle: "solid",
                    borderRightColor: "divider",

                    px: "1rem",
                    justifyContent: "center",
                    gap: ".5rem",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                        alignItems: "center",
                    }}>
                    <Typography variant="subtitle1">Inbound Pallets</Typography>
                    <Typography variant="caption">{ctx.displayRows.length.toLocaleString()} Results</Typography>
                </Box>
                <FilterBarMobile />
            </Box>
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
