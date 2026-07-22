import { Box, Button } from "@mui/material";
import { NavLink } from "react-router";

export const InboundPalletDetailPage = () => {
    return (
        <Box>
            <Button component={NavLink} to={".."} relative="path">
                Back to List
            </Button>
        </Box>
    );
};
