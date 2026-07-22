import { Box, ButtonBase, Collapse, Drawer, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ArrowDropDown, Close, Menu as MenuIcon, Search } from "@mui/icons-material";
import { useState } from "react";
import { navigation } from "../../../navigation/navigation";
import type { DomainItem, NavigationItem } from "../../../navigation/type";
import { NavLink } from "react-router";
export const MobileNavigation = ({ onChangeEvent }: { onChangeEvent?: (state: boolean) => void }) => {
    const [drawerState, setDrawerState] = useState(false);
    const onOpen = () => {
        setDrawerState(true);
        onChangeEvent?.(true);
    };
    const onClose = () => {
        setDrawerState(false);
        onChangeEvent?.(false);
    };
    return (
        <Box
            sx={{
                minHeight: "40px",
                display: "flex",
                px: "1rem",
                flexDirection: "row",
                justifyContent: "space-between",
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}>
            <IconButton sx={{ my: "0.25rem" }} onClick={onOpen}>
                <MenuIcon />
            </IconButton>
            <NavDrawer open={drawerState} onClose={onClose} />
        </Box>
    );
};

const NavDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            variant="temporary"
            ModalProps={{ keepMounted: true }}
            slotProps={{
                paper: {
                    sx: {
                        maxWidth: "88vh",
                        boxSizing: "border-box",
                        bgcolor: "background.paper",
                        backgroundImage: "none",
                    },
                },
            }}>
            <Box
                component={"nav"}
                aria-label="Primary Navigation"
                sx={{
                    height: "100%",
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    maxWidth: "88vw",
                }}>
                <Box
                    sx={{
                        paddingTop: "1rem",
                        minHeight: 48,
                        px: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderColor: "divider",
                    }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            // py: "0.25rem",
                            px: "1rem",
                        }}>
                        Navigation
                    </Typography>

                    <IconButton aria-label="Close navigation" onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        px: "1rem",
                        paddingBottom: "1rem",
                        paddingTop: "0.5rem",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}>
                    <TextField
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        placeholder="search..."
                    />
                </Box>
                <Box sx={{ overflow: "auto", flex: 1 }}>
                    <Box sx={{ my: "1rem" }}>
                        {navigation.map((item) => {
                            return <DomainButton onClose={onClose} key={item.id} item={item} />;
                        })}
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

const DomainButton = ({ item, onClose }: { item: DomainItem; onClose: () => void }) => {
    const [open, setOpen] = useState(true);
    const Icon = item.icon;
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.25rem", mx: "1rem" }}>
            <ButtonBase
                sx={{ gap: "0.25rem", display: "flex", justifyContent: "flex-start", p: "1rem" }}
                onClick={() => {
                    setOpen((p) => !p);
                }}>
                <ArrowDropDown
                    fontSize="small"
                    sx={{
                        color: "text.secondary",
                        transform: !open ? "rotate(-90deg)" : undefined,
                        transition: "transform 120ms ease-out",
                    }}
                />
                <Typography variant="button">{item.label}</Typography>
                <Icon fontSize="small" sx={{ color: "text.secondary", fontSize: "16px" }} />
            </ButtonBase>
            <Collapse timeout={120} in={open}>
                <Box
                    sx={{
                        ml: "1rem",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        flexDirection: "column",
                        color: "text.secondary",
                    }}>
                    {item.children?.map((navitem) => {
                        return <NavButton onClose={onClose} item={navitem} key={navitem.id}></NavButton>;
                    })}
                </Box>
            </Collapse>
        </Box>
    );
};

const NavButton = ({
    item,
    expanded = false,
    onToggle,
    onClose,
}: {
    item: NavigationItem;
    expanded?: boolean;
    onToggle?: () => void;
    onClose: () => void;
}) => {
    const hasChildren = Boolean(item.children?.length);
    const Icon = hasChildren ? ArrowDropDown : item.icon;

    const content = (
        <>
            <Box
                sx={{
                    width: 18,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                {Icon && (
                    <Icon
                        sx={{
                            fontSize: 16,
                            transform: hasChildren && !expanded ? "rotate(-90deg)" : "rotate(0deg)",
                            transition: "transform 140ms ease",
                        }}
                    />
                )}
            </Box>

            <Typography component="span" variant="body2" noWrap sx={{ textAlign: "left" }}>
                {item.label}
            </Typography>
        </>
    );

    const sx = {
        width: "100%",
        minWidth: 0,
        justifyContent: "flex-start",
        py: 1,
        px: 1,
        gap: 0.5,
        color: "text.secondary",
        borderRadius: 0,

        "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
        },

        "&.active": {
            bgcolor: "action.selected",
            color: "text.primary",
        },
    };

    if (hasChildren) {
        return (
            <ButtonBase type="button" disabled={item.disabled} aria-expanded={expanded} onClick={onToggle} sx={sx}>
                {content}
            </ButtonBase>
        );
    }

    if (item.path) {
        return (
            <ButtonBase onClick={onClose} component={NavLink} to={item.path} disabled={item.disabled} sx={sx}>
                {content}
            </ButtonBase>
        );
    }

    return null;
};
