import { ArrowBack, ArrowDropDown, Close, QrCodeRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonBase,
    Dialog,
    IconButton,
    Tooltip,
    Typography,
    type BoxProps,
    type SxProps,
    type Theme,
} from "@mui/material";
import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { NavLink, useLoaderData } from "react-router";

import type { LoaderData } from "./loader";
import type { InboundPalletType } from "../types";

const DETAIL_WIDTH = 380;

export const InboundPalletDetailMobilePage = () => {
    const { pallet } = useLoaderData() as LoaderData;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: 0,
                bgcolor: "background.default",
                overflow: "hidden",
            }}>
            <PageHeader />

            <Box
                component="main"
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    overscrollBehaviorY: "contain",
                    p: {
                        xs: 1.5,
                        sm: 3,
                    },
                }}>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 680,
                        mx: "auto",
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        boxShadow: 1,
                        overflow: "hidden",
                    }}>
                    <TitleCard pallet={pallet} />

                    <ActionSection />

                    <DetailSection label="Product">
                        <ProductCard pallet={pallet} />
                    </DetailSection>

                    <DetailSection label="Dimensions">
                        <DetailList>
                            <Tooltip title="Cases per layer / number of layers" placement="top" arrow>
                                <Box sx={{ width: "100%" }}>
                                    <LabelValueRow label="TI / HI" value={`${pallet.ti} / ${pallet.layers}`} />
                                </Box>
                            </Tooltip>

                            <LabelValueRow label="Expected Qty" value={pallet.qtyExpected} />

                            <LabelValueRow label="Stored Qty" value={pallet.qtyReceived} />
                        </DetailList>
                    </DetailSection>

                    <DetailSection label="Status">
                        <DetailList>
                            <LabelValueButton
                                label="State"
                                value={pallet.state}
                                onClick={() => {
                                    // Open state selector here.
                                }}
                            />

                            <LabelValueRow label="Assigned" value={pallet.assignedDate ? "Yes" : "No"} />

                            {pallet.assignedDate && (
                                <LabelValueRow
                                    label="Queued"
                                    value={<QueuedDateDisplay assignedDate={pallet.assignedDate} />}
                                    alignItems="flex-start"
                                />
                            )}
                        </DetailList>
                    </DetailSection>

                    <DetailSection label="Location" showDivider={false}>
                        <DetailList>
                            <LabelValueButton
                                label="Location"
                                value={pallet.location}
                                onClick={() => {
                                    // Open location selector here.
                                }}
                            />

                            {pallet.missing && <LabelValueRow label="Missing" value="Yes" valueColor="error.main" />}
                        </DetailList>
                    </DetailSection>
                </Box>
            </Box>
        </Box>
    );
};

const PageHeader = () => {
    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                alignItems: "center",
                minHeight: 56,
                px: 1,
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
                flexShrink: 0,
            }}>
            <Button
                component={NavLink}
                to=".."
                relative="path"
                variant="text"
                startIcon={<ArrowBack />}
                sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                }}>
                Inbound Pallets
            </Button>
        </Box>
    );
};

const ActionSection = () => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                px: 2,
                py: 1.5,
                overflowX: "auto",
                borderBottom: "1px solid",
                borderColor: "divider",

                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}>
            <Button
                variant="contained"
                disableElevation
                sx={{
                    minHeight: 42,
                    whiteSpace: "nowrap",
                    borderRadius: 2,
                }}>
                Primary Action
            </Button>

            <Button
                variant="outlined"
                sx={{
                    minHeight: 42,
                    whiteSpace: "nowrap",
                    borderRadius: 2,
                }}>
                Secondary Action
            </Button>
        </Box>
    );
};

type DetailSectionProps = {
    label: string;
    children: ReactNode;
    labelWidth?: number;
    showDivider?: boolean;
} & Omit<BoxProps, "children">;

const DetailSection = ({ label, children, labelWidth = 84, showDivider = true, sx, ...rest }: DetailSectionProps) => {
    return (
        <Box
            {...rest}
            sx={[
                {
                    display: "grid",
                    gridTemplateColumns: {
                        xs: `${labelWidth}px minmax(0, 1fr)`,
                        sm: "110px minmax(0, 1fr)",
                    },
                    alignItems: "center",
                    columnGap: 2,
                    px: 2,
                    py: 2,
                    borderBottom: showDivider ? "1px solid" : "none",
                    borderColor: "divider",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    textAlign: "right",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontWeight: 700,
                }}>
                {label}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    minWidth: 0,
                }}>
                {children}
            </Box>
        </Box>
    );
};

const ProductCard = ({ pallet }: { pallet: InboundPalletType }) => {
    return (
        <ButtonBase
            component={NavLink}
            to={`/skus/${encodeURIComponent(pallet.sku)}`}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                maxWidth: DETAIL_WIDTH,
                minWidth: 0,
                gap: 0.5,
                p: 1.5,
                bgcolor: "action.hover",
                borderRadius: 2,
                textAlign: "left",
                transition: (theme) => theme.transitions.create(["background-color", "transform"]),

                "&:hover": {
                    bgcolor: "action.selected",
                },

                "&:active": {
                    transform: "scale(0.99)",
                },
            }}>
            <Typography
                variant="subtitle1"
                sx={{
                    width: "100%",
                    fontWeight: 700,
                    lineHeight: 1.25,
                    overflowWrap: "anywhere",
                }}>
                {pallet.name}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    width: "100%",
                    overflowWrap: "anywhere",
                }}>
                {pallet.sku}
            </Typography>
        </ButtonBase>
    );
};

type DetailListProps = {
    children: ReactNode;
};

const DetailList = ({ children }: DetailListProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: DETAIL_WIDTH,
                gap: 0.75,

                "& > *": {
                    width: "100%",
                },
            }}>
            {children}
        </Box>
    );
};

type LabelValueRowProps = {
    label: string;
    value: ReactNode;
    alignItems?: "center" | "flex-start";
    valueColor?: string;
    sx?: SxProps<Theme>;
};

const LabelValueRow = ({ label, value, alignItems = "center", valueColor, sx }: LabelValueRowProps) => {
    return (
        <Box
            sx={[
                {
                    display: "grid",
                    gridTemplateColumns: "auto minmax(24px, 1fr) auto",
                    alignItems,
                    width: "100%",
                    minHeight: 32,
                    columnGap: 1,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
            <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{
                    whiteSpace: "nowrap",
                }}>
                {label}
            </Typography>

            <LeaderLine />

            <Typography
                component="span"
                variant="subtitle2"
                sx={{
                    color: valueColor,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    fontWeight: 700,
                }}>
                {value}
            </Typography>
        </Box>
    );
};

type LabelValueButtonProps = LabelValueRowProps & {
    onClick?: () => void;
};

const LabelValueButton = ({ label, value, alignItems = "center", valueColor, onClick, sx }: LabelValueButtonProps) => {
    return (
        <ButtonBase
            onClick={onClick}
            sx={[
                {
                    display: "grid",
                    gridTemplateColumns: "auto minmax(24px, 1fr) auto auto",
                    alignItems,
                    width: "100%",
                    minHeight: 44,
                    px: 1.25,
                    columnGap: 1,
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    textAlign: "left",
                    transition: (theme) => theme.transitions.create("background-color"),

                    "&:hover": {
                        bgcolor: "action.selected",
                    },

                    "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: 2,
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
            <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{
                    whiteSpace: "nowrap",
                }}>
                {label}
            </Typography>

            <LeaderLine />

            <Typography
                component="span"
                variant="subtitle2"
                sx={{
                    color: valueColor,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    fontWeight: 700,
                }}>
                {value}
            </Typography>

            <ArrowDropDown
                sx={{
                    color: "text.disabled",
                    ml: -0.5,
                }}
            />
        </ButtonBase>
    );
};

const LeaderLine = () => {
    return (
        <Box
            aria-hidden
            sx={{
                position: "relative",
                alignSelf: "stretch",
                minWidth: 0,

                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    borderTop: "1px dotted",
                    borderColor: "divider",
                    transform: "translateY(-50%)",
                },
            }}
        />
    );
};

const QueuedDateDisplay = ({ assignedDate }: { assignedDate: string }) => {
    const date = new Date(assignedDate);

    return (
        <Box
            component="span"
            sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-end",
                lineHeight: 1.25,
            }}>
            <Box component="span">
                {date.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </Box>

            <Box
                component="span"
                sx={{
                    color: "text.secondary",
                    fontWeight: 400,
                }}>
                {date.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                })}
            </Box>
        </Box>
    );
};

const TitleCard = ({ pallet }: { pallet: InboundPalletType }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ButtonBase
                onClick={() => setOpen(true)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    gap: 0.5,
                    px: 2,
                    py: 3,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    background: (theme) => `
                        radial-gradient(
                            ellipse 70% 130% at 50% 100%,
                            ${theme.alpha(theme.palette.primary.main, 0.12)} 0%,
                            transparent 75%
                        )
                    `,
                    transition: (theme) => theme.transitions.create("background-color"),

                    "&:hover": {
                        bgcolor: "action.hover",
                    },

                    "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: -2,
                    },
                }}>
                <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        lineHeight: 1.5,
                    }}>
                    Pallet
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        lineHeight: 1.15,
                        textAlign: "center",
                        fontSize: '1.5rem'
                        
                    }}>
                    {pallet.palletId}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflowWrap: "anywhere",
                        textAlign: "center",
                    }}>
                    {pallet.lpn}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 1,
                        color: "primary.main",
                    }}>
                    <QrCodeRounded fontSize="small" />

                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 700,
                        }}>
                        View barcodes
                    </Typography>
                </Box>
            </ButtonBase>

            <BarcodeDialog open={open} pallet={pallet} onClose={() => setOpen(false)} />
        </>
    );
};

type BarcodeDialogProps = {
    open: boolean;
    pallet: InboundPalletType;
    onClose: () => void;
};

const BarcodeDialog = ({ open, pallet, onClose }: BarcodeDialogProps) => {
    return (
        <Dialog
            open={open}
            fullScreen
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "background.default",
                    },
                },
            }}>
            <Box
                component="header"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: 56,
                    px: 1,
                    bgcolor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    flexShrink: 0,
                }}>
                <Typography
                    variant="h6"
                    sx={{
                        ml: 1,
                        fontWeight: 700,
                    }}>
                    Pallet Barcodes
                </Typography>

                <IconButton aria-label="Close barcode dialog" onClick={onClose}>
                    <Close />
                </IconButton>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: "column",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                }}>
                <BarcodeCard label="LPN" value={pallet.lpn} />

                <BarcodeCard label="Pallet ID" value={pallet.palletId} />
            </Box>
        </Dialog>
    );
};

type BarcodeCardProps = {
    value: string;
    label: string;
};

const BarcodeCard = ({ value, label }: BarcodeCardProps) => {
    const barcodeRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = barcodeRef.current;

        if (!svg || !value) {
            return;
        }

        JsBarcode(svg, value, {
            format: "CODE128",
            displayValue: true,
            width: 2,
            height: 88,
            margin: 8,
            fontSize: 16,
            textMargin: 8,
            background: "#ffffff",
            lineColor: "#000000",
        });
    }, [value]);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 540,
                mx: "auto",
                bgcolor: "#ffffff",
                color: "#000000",
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.12)",
                borderRadius: 3,
                boxShadow: 2,
                overflow: "hidden",
            }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.25,
                    borderBottom: "1px solid",
                    borderColor: "rgba(0, 0, 0, 0.12)",
                }}>
                <Typography
                    variant="overline"
                    sx={{
                        color: "rgba(0, 0, 0, 0.6)",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        lineHeight: 1.5,
                    }}>
                    {label}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color: "rgba(0, 0, 0, 0.6)",
                        overflowWrap: "anywhere",
                        textAlign: "right",
                    }}>
                    {value}
                </Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    p: 2,

                    "&::-webkit-scrollbar": {
                        height: 6,
                    },
                }}>
                <Box
                    component="svg"
                    ref={barcodeRef}
                    role="img"
                    aria-label={`${label} barcode for ${value}`}
                    sx={{
                        display: "block",
                        minWidth: "max-content",
                        height: "auto",
                        mx: "auto",
                    }}
                />
            </Box>
        </Box>
    );
};
