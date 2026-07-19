import { Box, Chip, ListItem } from "@mui/material";

export const Row = () => {
    return (
        <ListItem
            sx={{
                display: "grid",
                gridTemplateColumns: "100px minmax(100px , 200px) minmax(100px, 200px) minmax(100px, 200px) 1fr",
                paddingY: 0.5,
                color: "text.secondary",
                fontSize: "12px",
                "&:hover": {
                    color: "text.primary",
                    bgcolor: "action.hover",
                },
            }}>
            <Box sx={{ color: "text.primary", fontSize: "14px", px: "2rem" }}>123456</Box>
            <Box>A Product</Box>
            <Box>Qty: 10</Box>
            <Box>Received: 0</Box>
            <Box>
                <Chip label="Pending" size="small" sx={{ color: "text.secondary" }} />
            </Box>
        </ListItem>
    );
};
