import { Box } from "@mui/material";
import { usePalletsPage } from "./PageContext";
import { RowMobile } from "./Row.mobile";

export const PalletListMobile = () => {
    const { displayRows } = usePalletsPage();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                px: 2,
                py: 1.5,
            }}>
            {displayRows.map((pallet) => (
                <RowMobile key={pallet.lpn} pallet={pallet} />
            ))}
        </Box>
    );
};