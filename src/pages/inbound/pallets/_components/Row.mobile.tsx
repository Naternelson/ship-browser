import { Box, Chip, Typography } from "@mui/material";
import type { InboundPalletType } from "../types";
import { MobileButtonBase } from "../../../../_components/MobileButton";
import { Block, LocalFireDepartmentRounded, Warning } from "@mui/icons-material";
import { useNavigate } from "react-router";

export const RowMobile = ({ pallet }: { pallet: InboundPalletType }) => {
    const navigate = useNavigate();
    const disabled = pallet.priority === -1;

    return (
        <MobileButtonBase
            onClick={() => navigate(pallet.lpn)}
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "32px minmax(0, 1fr) auto",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 1,
                textAlign: "left",
                opacity: disabled ? 0.58 : 1,
            }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "stretch",
                    pt: 0.25,
                }}>
                <Priority priority={pallet.priority} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap color="text.primary">
                    {pallet.name}
                </Typography>

                <Typography variant="caption" color="text.secondary" noWrap>
                    {pallet.palletId} · {pallet.sku}
                </Typography>

                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                    {pallet.qtyExpected.toLocaleString()} cases
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 0.75,
                    minWidth: 0,
                }}>
                <Typography variant="caption" color="text.secondary" noWrap>
                    {pallet.state}
                </Typography>

                <Chip
                    label={pallet.location}
                    size="small"
                    variant="outlined"
                    sx={{
                        maxWidth: 100,
                        "& .MuiChip-label": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        },
                    }}
                />
            </Box>
        </MobileButtonBase>
    );
};

const Priority = ({ priority }: { priority: number }) => {
    if (priority === -1) {
        return <Block fontSize="small" color="disabled" />;
    }

    if (priority === 0) {
        return <Warning fontSize="small" color="error" />;
    }

    if (priority === 1) {
        return <LocalFireDepartmentRounded fontSize="small" color="warning" />;
    }

    return (
        <Box
            sx={{
                minWidth: 24,
                height: 24,
                px: 0.75,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                bgcolor: "action.hover",
            }}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {priority}
            </Typography>
        </Box>
    );
};
