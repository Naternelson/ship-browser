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
                overflow: "auto",
                borderRight: "1px solid",
                borderColor: "divider",
            }}>
            {displayRows.map((r) => {
                return <RowMobile key={r.lpn} pallet={r} />;
            })}
        </Box>
    );
};
