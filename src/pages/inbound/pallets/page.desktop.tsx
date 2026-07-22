import { Box } from "@mui/material";
import { Searchbar } from "./_components/Searchbar";
import { PalletList } from "./_components/PalletList";

export const PalletsPageDesktop = () => {
    return (
        <>
            <Box
                sx={{
                    px: "1rem",
                    display: "flex",
                    flex: 1,
                    overflow: "hidden",
                    flexDirection: "column",
                    minHeight: 0,
                }}>
                <Searchbar />
                <PalletList />
            </Box>
        </>
    );
};
