import { ArrowDropDown, Warning } from "@mui/icons-material";
import { Box, ButtonBase, Chip, Typography } from "@mui/material";
export const FilterBarMobile = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                overflowX: "auto",
                pb: 0.5,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}>
            <ButtonBase
                sx={{
                    flexShrink: 0,
                    height: 36,
                    px: 1.5,
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: "divider",
                    color: "text.secondary",
                    gap: 0.5,
                }}>
                <Typography variant="button">Status</Typography>
                <ArrowDropDown fontSize="small" />
            </ButtonBase>

            <ButtonBase
                sx={{
                    flexShrink: 0,
                    height: 36,
                    px: 1.5,
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: "divider",
                    color: "text.secondary",
                    gap: 0.5,
                }}>
                <Typography variant="button">Location</Typography>
                <ArrowDropDown fontSize="small" />
            </ButtonBase>

            <Chip
                size="small"
                label="Critical"
                icon={<Warning fontSize="small" />}
                onDelete={() => {}}
                sx={{ flexShrink: 0 }}
            />
        </Box>
    );
};
