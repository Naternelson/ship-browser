// src/theme/wmsTheme.ts
import { alpha, createTheme, type ThemeOptions } from "@mui/material/styles";

const colors = {
    background: {
        default: "#060A12",
        paper: "#0C121E",
        elevated: "#121B2A",
        raised: "#182337",
    },

    primary: {
        main: "#3B82F6",
        light: "#60A5FA",
        dark: "#1D4ED8",
        contrastText: "#FFFFFF",
    },

    secondary: {
        main: "#22C1C3",
        light: "#5EE0E2",
        dark: "#0E8F92",
        contrastText: "#031313",
    },

    text: {
        primary: "#E2E8F0",
        secondary: "#94A3B8",
        disabled: "#58677A",
    },

    divider: "#26364D",

    success: {
        main: "#22E58A",
        light: "#5EF2AA",
        dark: "#00A85A",
        contrastText: "#03130B",
    },

    warning: {
        main: "#FFB020",
        light: "#FFD166",
        dark: "#E67800",
        contrastText: "#170B00",
    },

    error: {
        main: "#FF3D5A",
        light: "#FF758A",
        dark: "#D90032",
        contrastText: "#FFFFFF",
    },

    info: {
        main: "#1FC7FF",
        light: "#70DEFF",
        dark: "#008CC9",
        contrastText: "#00141C",
    },
};

const themeOptions: ThemeOptions = {
    palette: {
        mode: "dark",

        background: {
            default: colors.background.default,
            paper: colors.background.paper,
        },

        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,

        text: colors.text,
        divider: colors.divider,

        action: {
            active: colors.text.secondary,
            hover: alpha(colors.primary.main, 0.09),
            selected: alpha(colors.primary.main, 0.2),
            disabled: alpha("#FFFFFF", 0.3),
            disabledBackground: alpha("#FFFFFF", 0.08),
            focus: alpha(colors.primary.main, 0.28),
        },
    },

    typography: {
        fontFamily: ["Inter", "Roboto", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"].join(","),

        h1: {
            fontSize: "1.75rem",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.025em",
        },

        h2: {
            fontSize: "1.375rem",
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
        },

        h3: {
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: 1.4,
        },

        h4: {
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.4,
        },

        subtitle1: {
            fontSize: "0.9375rem",
            fontWeight: 600,
        },

        subtitle2: {
            fontSize: "0.8125rem",
            fontWeight: 600,
        },

        body1: {
            fontSize: "0.875rem",
            lineHeight: 1.55,
        },

        body2: {
            fontSize: "0.8125rem",
            lineHeight: 1.5,
        },

        button: {
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "none",
        },

        caption: {
            fontSize: "0.75rem",
            lineHeight: 1.4,
            color: colors.text.secondary,
        },

        overline: {
            fontSize: "0.6875rem",
            fontWeight: 700,
            lineHeight: 1.5,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
        },
    },

    shape: {
        borderRadius: 8,
    },

    spacing: 8,

    shadows: [
        "none",
        "0 1px 2px rgba(0, 0, 0, 0.24)",
        "0 2px 6px rgba(0, 0, 0, 0.28)",
        "0 4px 12px rgba(0, 0, 0, 0.3)",
        "0 8px 20px rgba(0, 0, 0, 0.32)",
        "0 12px 28px rgba(0, 0, 0, 0.34)",
        "0 16px 36px rgba(0, 0, 0, 0.36)",
        ...Array(18).fill("0 16px 40px rgba(0, 0, 0, 0.38)"),
    ] as ThemeOptions["shadows"],

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    colorScheme: "dark",
                },

                body: {
                    backgroundColor: colors.background.default,
                    backgroundImage: `
                        radial-gradient(
                            ellipse at 15% -10%,
                            rgba(59, 130, 246, 0.07),
                            transparent 42%
                        ),
                        radial-gradient(
                            ellipse at 85% 10%,
                            rgba(14, 165, 233, 0.035),
                            transparent 36%
                        ),
                        radial-gradient(
                            ellipse at 50% 100%,
                            rgba(30, 64, 175, 0.045),
                            transparent 45%
                        ),
                        linear-gradient(
                            135deg,
                            rgba(255, 255, 255, 0.012),
                            transparent 40%,
                            rgba(59, 130, 246, 0.012)
                        )
                    `,
                    backgroundAttachment: "fixed",
                },

                "*": {
                    boxSizing: "border-box",
                },

                "*::-webkit-scrollbar": {
                    width: 10,
                    height: 10,
                },

                "*::-webkit-scrollbar-track": {
                    backgroundColor: colors.background.default,
                },

                "*::-webkit-scrollbar-thumb": {
                    backgroundColor: "#334155",
                    border: `2px solid ${colors.background.default}`,
                    borderRadius: 8,
                },

                "*::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#475569",
                },

                "::selection": {
                    backgroundColor: alpha(colors.primary.main, 0.35),
                },

                code: {
                    fontFamily: '"Roboto Mono", "SFMono-Regular", Consolas, monospace',
                },
            },
        },

        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                color: "transparent",
            },

            styleOverrides: {
                root: {
                    backgroundColor: alpha(colors.background.paper, 0.9),
                    backgroundImage: "none",
                    borderBottom: `1px solid ${colors.divider}`,
                    backdropFilter: "blur(12px)",
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: colors.background.paper,
                    backgroundImage: "none",
                    borderRight: `1px solid ${colors.divider}`,
                },
            },
        },

        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },

            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },

                outlined: {
                    borderColor: colors.divider,
                },

                rounded: {
                    borderRadius: 8,
                },
            },
        },

        MuiCard: {
            defaultProps: {
                variant: "outlined",
            },

            styleOverrides: {
                root: {
                    backgroundColor: colors.background.paper,
                    borderColor: colors.divider,
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.18)",
                },
            },
        },

        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: 16,
                    borderBottom: `1px solid ${colors.divider}`,
                },

                title: {
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                },

                subheader: {
                    marginTop: 2,
                    fontSize: "0.75rem",
                    color: colors.text.secondary,
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 16,

                    "&:last-child": {
                        paddingBottom: 16,
                    },
                },
            },
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },

            styleOverrides: {
                root: {
                    minHeight: 36,
                    paddingInline: 14,
                    borderRadius: 6,

                    "&.MuiButton-contained.MuiButton-colorPrimary": {
                        boxShadow: `0 0 0 1px ${alpha(colors.primary.light, 0.1)}`,

                        "&:hover": {
                            backgroundColor: colors.primary.light,
                        },
                    },
                },

                sizeSmall: {
                    minHeight: 30,
                    paddingInline: 10,
                },

                sizeLarge: {
                    minHeight: 44,
                    paddingInline: 18,
                    fontSize: "0.875rem",
                },

                outlined: {
                    borderColor: "#334155",

                    "&:hover": {
                        borderColor: "#475569",
                        backgroundColor: alpha("#FFFFFF", 0.04),
                    },
                },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,

                    "&:hover": {
                        backgroundColor: alpha("#FFFFFF", 0.06),
                    },
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
                variant: "outlined",
            },
        },

        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: colors.text.secondary,

                    "&.Mui-focused": {
                        color: colors.primary.light,
                    },
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    minHeight: 40,
                    borderRadius: 6,
                    backgroundColor: "#09101B",

                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#344A68",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4C6B91",
                    },

                    "&.Mui-focused": {
                        backgroundColor: "#0C1524",
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary.light,
                        boxShadow: `0 0 0 3px ${alpha(colors.primary.main, 0.22)}`,
                    },
                },
            },
        },

        MuiInputBase: {
            styleOverrides: {
                input: {
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 100px ${colors.background.paper} inset`,
                        WebkitTextFillColor: colors.text.primary,
                        caretColor: colors.text.primary,
                    },
                },
            },
        },

        MuiSelect: {
            defaultProps: {
                size: "small",
            },
        },

        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: 7,
                },
            },
        },

        MuiRadio: {
            styleOverrides: {
                root: {
                    padding: 7,
                },
            },
        },

        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    "&.Mui-checked + .MuiSwitch-track": {
                        opacity: 0.7,
                    },
                },

                track: {
                    backgroundColor: "#475569",
                },
            },
        },

        MuiTableContainer: {
            styleOverrides: {
                root: {
                    border: `1px solid ${colors.divider}`,
                    borderRadius: 8,
                    backgroundColor: colors.background.paper,
                },
            },
        },

        MuiTable: {
            defaultProps: {
                size: "small",
                stickyHeader: true,
            },
        },

        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        backgroundColor: "#162238",
                        color: "#E2E8F0",
                        borderBottom: "1px solid #3B506E",
                    },
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    height: 46,
                    padding: "8px 12px",
                    borderBottom: `1px solid ${colors.divider}`,
                    fontSize: "0.8125rem",
                },

                head: {
                    height: 42,
                },
            },
        },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&:last-of-type .MuiTableCell-root": {
                        borderBottom: 0,
                    },

                    "&:hover": {
                        backgroundColor: alpha(colors.primary.main, 0.045),
                    },

                    "&.Mui-selected": {
                        backgroundColor: alpha(colors.primary.main, 0.12),

                        "&:hover": {
                            backgroundColor: alpha(colors.primary.main, 0.16),
                        },
                    },
                },
            },
        },

        MuiChip: {
            defaultProps: {
                size: "small",
            },

            styleOverrides: {
                root: {
                    height: 24,
                    borderRadius: 6,
                    fontSize: "0.71875rem",
                    fontWeight: 600,
                },

                label: {
                    paddingInline: 8,
                },

                outlined: {
                    borderColor: "#334155",
                },
            },
        },

        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    const severity = ownerState.severity ?? "success";
                    const color = theme.palette[severity];

                    return {
                        borderRadius: 8,

                        ...(ownerState.variant === "standard" && {
                            border: "1px solid",
                            borderColor: alpha(color.main, 0.35),
                            backgroundColor: alpha(color.main, 0.1),
                        }),
                    };
                },
            },
        },

        MuiDialog: {
            styleOverrides: {
                paper: {
                    border: "1px solid #344A68",
                    backgroundColor: colors.background.paper,
                    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.65)",
                },
            },
        },

        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: "16px 20px",
                    borderBottom: `1px solid ${colors.divider}`,
                    fontSize: "1rem",
                    fontWeight: 600,
                },
            },
        },

        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: 20,
                },
            },
        },

        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: "12px 20px",
                    borderTop: `1px solid ${colors.divider}`,
                },
            },
        },

        MuiMenu: {
            styleOverrides: {
                paper: {
                    marginTop: 4,
                    border: "1px solid #344A68",
                    backgroundColor: colors.background.elevated,
                    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.55)",
                },
            },
        },

        MuiMenuItem: {
            styleOverrides: {
                root: {
                    minHeight: 36,
                    marginInline: 4,
                    borderRadius: 5,
                    fontSize: "0.8125rem",

                    "&.Mui-selected": {
                        backgroundColor: alpha(colors.primary.main, 0.14),
                    },
                },
            },
        },

        MuiTooltip: {
            defaultProps: {
                arrow: true,
                enterDelay: 500,
            },

            styleOverrides: {
                tooltip: {
                    padding: "6px 9px",
                    border: `1px solid ${colors.divider}`,
                    backgroundColor: "#020617",
                    fontSize: "0.75rem",
                },

                arrow: {
                    color: "#020617",
                },
            },
        },

        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: 40,
                    borderBottom: `1px solid ${colors.divider}`,
                },

                indicator: {
                    height: 2,
                },
            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: 40,
                    padding: "8px 14px",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    textTransform: "none",
                },
            },
        },

        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    fontSize: "0.8125rem",
                    color: colors.text.secondary,
                },

                separator: {
                    color: colors.text.disabled,
                },
            },
        },

        MuiSkeleton: {
            defaultProps: {
                animation: "wave",
            },

            styleOverrides: {
                root: {
                    backgroundColor: alpha("#FFFFFF", 0.07),
                },
            },
        },

        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: "#263247",
                },

                bar: {
                    borderRadius: 999,
                },
            },
        },
    },
};

export const theme = createTheme(themeOptions);
