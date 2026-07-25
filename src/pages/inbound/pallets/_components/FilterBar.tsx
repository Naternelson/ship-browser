import { ArrowDropDown, Warning } from "@mui/icons-material";
import { Box, ButtonBase, Chip, Typography } from "@mui/material";

export const FilterBarMobile = () => {
    return (
        <Box
            sx={{
                paddingBottom: "0.5rem",
                gap: "0.5rem",
                display: "flex",
                flexDirection: "column",
                zIndex: 1,
            }}>
            <Box sx={{ height: "40ox", overflowX: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ButtonBase
                    sx={{
                        display: "flex",
                        borderRadius: "10px",
                        flexDirection: "row",
                        alignItems: "center",
                        px: "0.552846rem",
                        minWidth: "100px",
                        py: ".25rem",
                        color: "text.disabled",
                        border: "1px solid",
                        justifyContent: "center",
                        gap: ".5rem",
                    }}>
                    <Typography variant="button">Status</Typography>
                    <ArrowDropDown />
                </ButtonBase>
                <ButtonBase
                    sx={{
                        display: "flex",
                        borderRadius: "10px",
                        flexDirection: "row",
                        alignItems: "center",
                        px: "0.552846rem",
                        minWidth: "100px",
                        py: ".25rem",
                        color: "text.disabled",
                        border: "1px solid",
                        justifyContent: "center",
                        gap: ".5rem",
                    }}>
                    <Typography variant="button">Location</Typography>
                    <ArrowDropDown />
                </ButtonBase>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", overflowX: "auto" }}>
                <Chip
                    label={"Criticals"}
                    icon={<Warning sx={{ fontSize: "14px", color: "text.disabled" }} />}
                    onDelete={() => {}}
                />
            </Box>
        </Box>
    );
};
