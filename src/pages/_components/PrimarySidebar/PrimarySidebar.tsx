import { ChevronRight, Close, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import {
    Box,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router";

import type { DomainItem, NavigationItem } from "../../../navigation/type";

const DOMAIN_BAR_WIDTH = 42;
const DOMAIN_SIDEBAR_WIDTH = 220;
const MOBILE_DRAWER_WIDTH = 300;
const MOBILE_TOP_BAR_HEIGHT = 48;

type PrimaryNavigationProps = {
    navigationConfig: DomainItem[];
};

/**
 * Responsive navigation entry point.
 *
 * Desktop:
 * - permanent domain rail
 * - permanent domain sidebar
 *
 * Mobile:
 * - top navigation bar
 * - temporary drawer containing domains and navigation
 */
export const PrimarySidebar = ({ navigationConfig }: PrimaryNavigationProps) => {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (isMobile) {
        return <MobilePrimaryNavigation navigationConfig={navigationConfig} />;
    }

    return <DesktopPrimarySidebar navigationConfig={navigationConfig} />;
};

/**
 * Desktop-only navigation.
 *
 * This component does not contain any mobile drawer or
 * responsive behavior.
 */
export const DesktopPrimarySidebar = ({ navigationConfig }: PrimaryNavigationProps) => {
    const location = useLocation();

    const routeDomain = useMemo(
        () => findDomainForPath(navigationConfig, location.pathname),
        [location.pathname, navigationConfig],
    );

    const [activeDomainId, setActiveDomainId] = useState<DomainItem["id"]>(
        routeDomain?.id ?? navigationConfig[0]?.id ?? "",
    );

    useEffect(() => {
        if (routeDomain) {
            setActiveDomainId(routeDomain.id);
        }
    }, [routeDomain]);

    const activeDomain = getActiveDomain({
        navigationConfig,
        activeDomainId,
        routeDomain,
    });

    if (!activeDomain) {
        return null;
    }

    return (
        <Box
            component="nav"
            aria-label="Primary navigation"
            sx={{
                display: "flex",
                width: DOMAIN_BAR_WIDTH + DOMAIN_SIDEBAR_WIDTH,
                height: "100%",
                minHeight: 0,
                flexShrink: 0,
                overflow: "hidden",
            }}>
            <DesktopDomainBar
                navigationConfig={navigationConfig}
                activeDomainId={activeDomain.id}
                onChange={setActiveDomainId}
            />

            <DomainSidebar domain={activeDomain} currentPath={location.pathname} />
        </Box>
    );
};

/**
 * Mobile-only navigation.
 *
 * Displays a top bar. The menu button opens a drawer
 * containing both domain selection and domain navigation.
 */
export const MobilePrimaryNavigation = ({ navigationConfig }: PrimaryNavigationProps) => {
    const location = useLocation();

    const routeDomain = useMemo(
        () => findDomainForPath(navigationConfig, location.pathname),
        [location.pathname, navigationConfig],
    );

    const [activeDomainId, setActiveDomainId] = useState<DomainItem["id"]>(
        routeDomain?.id ?? navigationConfig[0]?.id ?? "",
    );

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (routeDomain) {
            setActiveDomainId(routeDomain.id);
        }
    }, [routeDomain]);

    /*
     * Close the drawer after navigation.
     */
    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname]);

    const activeDomain = getActiveDomain({
        navigationConfig,
        activeDomainId,
        routeDomain,
    });

    const handleClose = useCallback(() => {
        setDrawerOpen(false);
    }, []);

    if (!activeDomain) {
        return null;
    }

    const ActiveDomainIcon = activeDomain.icon;

    return (
        <>
            <Box
                component="header"
                sx={{
                    position: "relative",
                    zIndex: (theme) => theme.zIndex.appBar,
                    height: MOBILE_TOP_BAR_HEIGHT,
                    minHeight: MOBILE_TOP_BAR_HEIGHT,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}>
                <IconButton
                    aria-label="Open navigation"
                    onClick={() => {
                        setDrawerOpen(true);
                    }}
                    size="small">
                    <MenuIcon />
                </IconButton>

                <ActiveDomainIcon
                    sx={{
                        ml: 0.5,
                        fontSize: 19,
                        color: "primary.main",
                    }}
                />

                <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                        minWidth: 0,
                        color: "text.primary",
                    }}>
                    {activeDomain.label}
                </Typography>
            </Box>

            <Drawer
                anchor="left"
                variant="temporary"
                open={drawerOpen}
                onClose={handleClose}
                ModalProps={{
                    keepMounted: true,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            width: MOBILE_DRAWER_WIDTH,
                            maxWidth: "88vw",
                            boxSizing: "border-box",
                            bgcolor: "background.paper",
                            backgroundImage: "none",
                        },
                    },
                }}>
                <MobileDrawerContent
                    navigationConfig={navigationConfig}
                    activeDomain={activeDomain}
                    activeDomainId={activeDomain.id}
                    currentPath={location.pathname}
                    onDomainChange={setActiveDomainId}
                    onClose={handleClose}
                />
            </Drawer>
        </>
    );
};

type DesktopDomainBarProps = {
    activeDomainId: DomainItem["id"];
    navigationConfig: DomainItem[];
    onChange: (domainId: DomainItem["id"]) => void;
};

const DesktopDomainBar = ({ activeDomainId, navigationConfig, onChange }: DesktopDomainBarProps) => {
    return (
        <Box
            sx={{
                width: DOMAIN_BAR_WIDTH,
                flexShrink: 0,
                height: "100%",
                borderRight: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
            }}>
            {navigationConfig.map((domain) => (
                <DesktopDomainButton
                    key={domain.id}
                    domain={domain}
                    active={activeDomainId === domain.id}
                    onChange={onChange}
                />
            ))}
        </Box>
    );
};

type DesktopDomainButtonProps = {
    domain: DomainItem;
    active: boolean;
    onChange: (domainId: DomainItem["id"]) => void;
};

const DesktopDomainButton = ({ domain, active, onChange }: DesktopDomainButtonProps) => {
    const Icon = domain.icon;

    return (
        <Tooltip title={domain.label} placement="right">
            <Box
                component="button"
                type="button"
                aria-label={domain.label}
                aria-pressed={active}
                disabled={domain.disabled}
                onClick={() => {
                    onChange(domain.id);
                }}
                sx={{
                    width: "100%",
                    height: 38,
                    flexShrink: 0,
                    p: 0,
                    border: 0,
                    borderLeft: "2px solid",
                    borderLeftColor: active ? "primary.main" : "transparent",
                    borderRadius: 0,
                    color: active ? "text.primary" : "text.secondary",
                    bgcolor: active ? "action.selected" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: domain.disabled ? "default" : "pointer",

                    "&:hover": {
                        bgcolor: domain.disabled ? "transparent" : "action.hover",
                        color: domain.disabled ? "text.disabled" : "text.primary",
                    },

                    "&:focus-visible": {
                        outline: "1px solid",
                        outlineColor: "primary.main",
                        outlineOffset: -1,
                    },

                    "&:disabled": {
                        color: "text.disabled",
                        opacity: 0.6,
                    },
                }}>
                <Icon sx={{ fontSize: 19 }} />
            </Box>
        </Tooltip>
    );
};

type MobileDrawerContentProps = {
    navigationConfig: DomainItem[];
    activeDomain: DomainItem;
    activeDomainId: DomainItem["id"];
    currentPath: string;
    onDomainChange: (domainId: DomainItem["id"]) => void;
    onClose: () => void;
};

const MobileDrawerContent = ({
    navigationConfig,
    activeDomain,
    activeDomainId,
    currentPath,
    onDomainChange,
    onClose,
}: MobileDrawerContentProps) => {
    return (
        <Box
            component="nav"
            aria-label="Mobile primary navigation"
            sx={{
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}>
            <Box
                sx={{
                    height: MOBILE_TOP_BAR_HEIGHT,
                    minHeight: MOBILE_TOP_BAR_HEIGHT,
                    px: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 700,
                    }}>
                    Navigation
                </Typography>

                <IconButton aria-label="Close navigation" onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </Box>

            <MobileDomainSelector
                navigationConfig={navigationConfig}
                activeDomainId={activeDomainId}
                onChange={onDomainChange}
            />

            <Box
                sx={{
                    minHeight: 0,
                    flex: 1,
                    overflow: "hidden",
                }}>
                <DomainSidebar domain={activeDomain} currentPath={currentPath} drawer onNavigate={onClose} />
            </Box>
        </Box>
    );
};

type MobileDomainSelectorProps = {
    activeDomainId: DomainItem["id"];
    navigationConfig: DomainItem[];
    onChange: (domainId: DomainItem["id"]) => void;
};

const MobileDomainSelector = ({ activeDomainId, navigationConfig, onChange }: MobileDomainSelectorProps) => {
    return (
        <Box
            sx={{
                px: 1,
                py: 1,
                display: "flex",
                gap: 0.5,
                overflowX: "auto",
                borderBottom: "1px solid",
                borderColor: "divider",

                "&::-webkit-scrollbar": {
                    height: 4,
                },
            }}>
            {navigationConfig.map((domain) => {
                const Icon = domain.icon;
                const active = domain.id === activeDomainId;

                return (
                    <Box
                        key={domain.id}
                        component="button"
                        type="button"
                        aria-pressed={active}
                        disabled={domain.disabled}
                        onClick={() => {
                            onChange(domain.id);
                        }}
                        sx={{
                            minWidth: 72,
                            px: 1,
                            py: 0.75,
                            border: "1px solid",
                            borderColor: active ? "primary.main" : "divider",
                            borderRadius: 1,
                            bgcolor: active ? "action.selected" : "transparent",
                            color: active ? "text.primary" : "text.secondary",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5,
                            cursor: domain.disabled ? "default" : "pointer",

                            "&:hover": {
                                bgcolor: domain.disabled ? "transparent" : "action.hover",
                                color: domain.disabled ? "text.disabled" : "text.primary",
                            },

                            "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: "primary.main",
                                outlineOffset: 1,
                            },

                            "&:disabled": {
                                color: "text.disabled",
                                opacity: 0.55,
                            },
                        }}>
                        <Icon
                            sx={{
                                fontSize: 20,
                            }}
                        />

                        <Typography
                            component="span"
                            variant="caption"
                            noWrap
                            sx={{
                                width: "100%",
                                color: "inherit",
                                fontSize: "0.6875rem",
                                fontWeight: active ? 600 : 500,
                                textAlign: "center",
                            }}>
                            {domain.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

type DomainSidebarProps = {
    domain: DomainItem;
    currentPath: string;
    drawer?: boolean;
    onNavigate?: () => void;
};

const DomainSidebar = ({ domain, currentPath, drawer = false, onNavigate }: DomainSidebarProps) => {
    const rootItem: NavigationItem | null = domain.path
        ? {
              id: `${domain.id}-root`,
              label: domain.label,
              path: domain.path,
              icon: domain.icon,
              badge: domain.badge,
              disabled: domain.disabled,
          }
        : null;

    return (
        <Box
            sx={{
                width: drawer ? "100%" : DOMAIN_SIDEBAR_WIDTH,
                height: "100%",
                minHeight: 0,
                flexShrink: 0,
                overflowY: "auto",
                borderRight: drawer ? 0 : "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
            }}>
            <Box
                sx={{
                    height: 36,
                    px: 1.25,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    bgcolor: "background.paper",
                }}>
                <Typography
                    variant="caption"
                    noWrap
                    sx={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                    }}>
                    {domain.label}
                </Typography>
            </Box>

            <List disablePadding>
                {rootItem && <NavigationRow item={rootItem} currentPath={currentPath} onNavigate={onNavigate} />}

                {domain.children?.map((item) => (
                    <NavigationRow key={item.id} item={item} currentPath={currentPath} onNavigate={onNavigate} />
                ))}

                {!rootItem && !domain.children?.length && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: "block",
                            px: 1.25,
                            py: 1,
                        }}>
                        No navigation items
                    </Typography>
                )}
            </List>
        </Box>
    );
};

type NavigationRowProps = {
    item: NavigationItem;
    currentPath: string;
    depth?: number;
    onNavigate?: () => void;
};

const NavigationRow = ({ item, currentPath, depth = 0, onNavigate }: NavigationRowProps) => {
    const hasChildren = Boolean(item.children?.length);

    const itemIsActive = pathMatches(currentPath, item.path);

    const childIsActive = item.children?.some((child) => itemContainsPath(child, currentPath)) ?? false;

    const selected = itemIsActive || childIsActive;

    const [expanded, setExpanded] = useState(childIsActive);

    useEffect(() => {
        if (childIsActive) {
            setExpanded(true);
        }
    }, [childIsActive]);

    const Icon = item.icon;

    if (hasChildren) {
        return (
            <>
                <ListItemButton
                    selected={selected}
                    disabled={item.disabled}
                    aria-expanded={expanded}
                    onClick={() => {
                        setExpanded((value) => !value);
                    }}
                    sx={getNavigationRowStyles({
                        depth,
                        selected,
                        expandable: true,
                    })}>
                    <Box
                        sx={{
                            width: 18,
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        {expanded ? (
                            <ExpandMore
                                sx={{
                                    fontSize: 16,
                                }}
                            />
                        ) : (
                            <ChevronRight
                                sx={{
                                    fontSize: 16,
                                }}
                            />
                        )}
                    </Box>

                    {Icon && <NavigationIcon Icon={Icon} />}

                    <NavigationLabel label={item.label} selected={selected} />

                    {item.badge !== undefined && <NavigationBadge value={item.badge} />}
                </ListItemButton>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {item.children?.map((child) => (
                            <NavigationRow
                                key={child.id}
                                item={child}
                                currentPath={currentPath}
                                depth={depth + 1}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </List>
                </Collapse>
            </>
        );
    }

    if (!item.path) {
        return null;
    }

    return (
        <ListItemButton
            component={NavLink}
            to={item.path}
            end={normalizePath(item.path) === "/"}
            selected={itemIsActive}
            disabled={item.disabled}
            onClick={onNavigate}
            sx={getNavigationRowStyles({
                depth,
                selected: itemIsActive,
                expandable: false,
            })}>
            {Icon && <NavigationIcon Icon={Icon} />}

            <NavigationLabel label={item.label} selected={itemIsActive} />

            {item.badge !== undefined && <NavigationBadge value={item.badge} />}
        </ListItemButton>
    );
};

type NavigationIconProps = {
    Icon: NavigationItem["icon"];
};

const NavigationIcon = ({ Icon }: NavigationIconProps) => {
    if (!Icon) {
        return null;
    }

    return (
        <ListItemIcon
            sx={{
                minWidth: 24,
                color: "inherit",
            }}>
            <Icon sx={{ fontSize: 16 }} />
        </ListItemIcon>
    );
};

type NavigationLabelProps = {
    label: string;
    selected: boolean;
};

const NavigationLabel = ({ label, selected }: NavigationLabelProps) => {
    return (
        <ListItemText
            primary={label}
            slotProps={{
                primary: {
                    noWrap: true,
                    sx: {
                        fontSize: "0.75rem",
                        lineHeight: 1,
                        fontWeight: selected ? 600 : 400,
                    },
                },
            }}
        />
    );
};

const NavigationBadge = ({ value }: { value: string | number }) => {
    return (
        <Typography
            component="span"
            sx={{
                ml: 0.5,
                flexShrink: 0,
                fontSize: "0.6875rem",
                lineHeight: 1,
                color: "text.secondary",
            }}>
            {value}
        </Typography>
    );
};

type NavigationRowStyleOptions = {
    depth: number;
    selected: boolean;
    expandable: boolean;
};

const getNavigationRowStyles = ({ depth, selected, expandable }: NavigationRowStyleOptions) => ({
    height: 30,
    minHeight: 30,
    py: 0,
    pr: 0.75,
    pl: expandable ? 0.5 + depth * 1.75 : 1 + depth * 1.75,
    borderRadius: 0,
    color: selected ? "text.primary" : "text.secondary",

    "&:hover": {
        bgcolor: "action.hover",
        color: "text.primary",
    },

    "&.Mui-selected": {
        bgcolor: expandable ? "transparent" : "action.selected",
        color: "text.primary",

        "&:hover": {
            bgcolor: expandable ? "action.hover" : "action.selected",
        },
    },

    "&.active": {
        bgcolor: expandable ? "transparent" : "action.selected",
        color: "text.primary",
    },

    "&.Mui-focusVisible": {
        outline: "1px solid",
        outlineColor: "primary.main",
        outlineOffset: -1,
    },
});

type ActiveDomainOptions = {
    navigationConfig: DomainItem[];
    activeDomainId: DomainItem["id"];
    routeDomain?: DomainItem;
};

const getActiveDomain = ({
    navigationConfig,
    activeDomainId,
    routeDomain,
}: ActiveDomainOptions): DomainItem | undefined => {
    return navigationConfig.find((domain) => domain.id === activeDomainId) ?? routeDomain ?? navigationConfig[0];
};

const findDomainForPath = (navigationConfig: DomainItem[], currentPath: string): DomainItem | undefined => {
    return navigationConfig.find((domain) => domainContainsPath(domain, currentPath));
};

const pathMatches = (currentPath: string, itemPath?: string): boolean => {
    if (!itemPath) {
        return false;
    }

    const normalizedCurrent = normalizePath(currentPath);

    const normalizedItem = normalizePath(itemPath);

    if (normalizedItem === "/") {
        return normalizedCurrent === "/";
    }

    return normalizedCurrent === normalizedItem || normalizedCurrent.startsWith(`${normalizedItem}/`);
};

const normalizePath = (path: string): string => {
    if (path === "/") {
        return path;
    }

    return path.replace(/\/+$/, "");
};

const itemContainsPath = (item: NavigationItem, currentPath: string): boolean => {
    if (pathMatches(currentPath, item.path)) {
        return true;
    }

    return item.children?.some((child) => itemContainsPath(child, currentPath)) ?? false;
};

const domainContainsPath = (domain: DomainItem, currentPath: string): boolean => {
    if (pathMatches(currentPath, domain.path)) {
        return true;
    }

    return domain.children?.some((item) => itemContainsPath(item, currentPath)) ?? false;
};
