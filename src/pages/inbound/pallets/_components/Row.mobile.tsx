import { Box, Chip, Typography } from "@mui/material";
import type { InboundPalletType } from "../types";
import { MobileButtonBase } from "../../../../_components/MobileButton";
import { Block, LocalFireDepartmentRounded, Warning } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router";

export const RowMobile = ({ pallet }: { pallet: InboundPalletType }) => {
    const nav = useNavigate();
    return (
        <MobileButtonBase
            component={NavLink}
            onClick={() => {
                nav(pallet.lpn);
            }}
            sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: ".25rem",

                color: pallet.priority === -1 ? (t) => `${t.palette.action.disabled} !important` : "text.secondary",
            }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0.5rem",
                    gap: "0.5rem",
                    mx: "1rem",
                }}>
                <Priority priority={pallet.priority} />
                <Typography
                    variant="subtitle1"
                    sx={{ color: pallet.priority === -1 ? "text.disabled" : "text.secondary", lineHeight: 1 }}>
                    {pallet.palletId}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: pallet.priority === -1 ? "text.disabled" : "text.secondary" }}>
                    {pallet.qtyExpected} Cases
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0.25rem",
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                }}>
                <Typography
                    variant="body1"
                    noWrap
                    sx={{
                        color: pallet.priority === -1 ? "text.disabled" : "text.secondary",
                        width: "100%",
                        textAlign: "left",
                        fontWeight: "bold",
                    }}>
                    {pallet.name}
                </Typography>

                <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                        width: "100%",
                        textAlign: "left",
                    }}>
                    {pallet.sku}
                </Typography>

                <Chip label={pallet.location} />
            </Box>
            <Box sx={{  px: 1, alignItems: "center" }}>{pallet.state}</Box>
        </MobileButtonBase>
    );
};

const Priority = ({ priority }: { priority: number }) => {
    if (priority === -1) return <Block fontSize="medium" sx={{ color: "text.secondary" }} />;
    if (priority === 0) return <Warning fontSize="medium" color={"error"} />;
    if (priority === 1) return <LocalFireDepartmentRounded fontSize="medium" color="warning" />;
    return (
        <Typography variant="h3" sx={{ color: "text.secondary", lineHeight: 1 }}>
            {priority.toLocaleString()}
        </Typography>
    );
};
