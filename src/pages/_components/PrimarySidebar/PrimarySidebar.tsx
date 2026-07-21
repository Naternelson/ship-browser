
import {
    ChevronRight,
    ExpandMore,
} from '@mui/icons-material'
import {
    Box,
    Collapse,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import {
    NavLink,
    useLocation,
} from 'react-router'

import type {
    DomainItem,
    NavigationItem,
} from '../../../navigation/type'

const DOMAIN_BAR_WIDTH = 42
const DOMAIN_SIDEBAR_WIDTH = 220
const MOBILE_DRAWER_WIDTH = 260

type PrimarySidebarProps = {
    navigationConfig: DomainItem[]
}

export const PrimarySidebar = ({
    navigationConfig,
}: PrimarySidebarProps) => {
    const location = useLocation()
    const theme = useTheme()

    const isMobile = useMediaQuery(
        theme.breakpoints.down('md'),
    )

    const routeDomain = useMemo(
        () =>
            navigationConfig.find(domain =>
                domainContainsPath(
                    domain,
                    location.pathname,
                ),
            ),
        [location.pathname, navigationConfig],
    )

    const [activeDomainId, setActiveDomainId] =
        useState<DomainItem['id']>(
            routeDomain?.id ??
                navigationConfig[0]?.id ??
                '',
        )

    const [drawerOpen, setDrawerOpen] =
        useState(false)

    useEffect(() => {
        if (routeDomain) {
            setActiveDomainId(routeDomain.id)
        }
    }, [routeDomain])

    /*
     * Close the mobile drawer whenever the user
     * navigates to another route.
     */
    useEffect(() => {
        setDrawerOpen(false)
    }, [location.pathname])

    /*
     * Ensure the temporary drawer is closed when
     * switching back to the desktop layout.
     */
    useEffect(() => {
        if (!isMobile) {
            setDrawerOpen(false)
        }
    }, [isMobile])

    const activeDomain =
        navigationConfig.find(
            domain =>
                domain.id === activeDomainId,
        ) ??
        routeDomain ??
        navigationConfig[0]

    const handleDomainChange = useCallback(
        (domainId: DomainItem['id']) => {
            setActiveDomainId(domainId)

            if (isMobile) {
                setDrawerOpen(true)
            }
        },
        [isMobile],
    )

    const handleDrawerClose = useCallback(() => {
        setDrawerOpen(false)
    }, [])

    if (!activeDomain) {
        return null
    }

    return (
        <Box
            component="nav"
            aria-label="Primary navigation"
            sx={{
                display: 'flex',
                height: '100%',
                minHeight: 0,
                overflow: 'hidden',
            }}
        >
            <DomainBar
                activeDomainId={activeDomain.id}
                navigationConfig={navigationConfig}
                onChange={handleDomainChange}
            />

            {/* Permanent desktop sidebar */}
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                    height: '100%',
                    minHeight: 0,
                }}
            >
                <DomainSidebar
                    domain={activeDomain}
                    currentPath={location.pathname}
                />
            </Box>

            {/* Temporary mobile sidebar */}
            <Drawer
                anchor="left"
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            left: DOMAIN_BAR_WIDTH,
                            width: MOBILE_DRAWER_WIDTH,
                            maxWidth: `calc(100vw - ${DOMAIN_BAR_WIDTH}px)`,
                            boxSizing: 'border-box',
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        },
                    },
                }}
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                    },

                    /*
                     * Leave the domain rail uncovered
                     * while the drawer is open.
                     */
                    '& .MuiBackdrop-root': {
                        left: DOMAIN_BAR_WIDTH,
                    },
                }}
            >
                <DomainSidebar
                    domain={activeDomain}
                    currentPath={location.pathname}
                    drawer
                    onNavigate={handleDrawerClose}
                />
            </Drawer>
        </Box>
    )
}

type DomainBarProps = {
    activeDomainId: DomainItem['id']
    navigationConfig: DomainItem[]
    onChange: (
        domainId: DomainItem['id'],
    ) => void
}

const DomainBar = ({
    activeDomainId,
    navigationConfig,
    onChange,
}: DomainBarProps) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: {
                    xs: theme.zIndex.drawer + 1,
                    md: 'auto',
                },
                width: DOMAIN_BAR_WIDTH,
                flexShrink: 0,
                height: '100%',
                borderRight: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {navigationConfig.map(domain => (
                <DomainButton
                    key={domain.id}
                    domain={domain}
                    active={
                        activeDomainId === domain.id
                    }
                    onChange={onChange}
                />
            ))}
        </Box>
    )
}

type DomainButtonProps = {
    domain: DomainItem
    active: boolean
    onChange: (
        domainId: DomainItem['id'],
    ) => void
}

const DomainButton = ({
    domain,
    active,
    onChange,
}: DomainButtonProps) => {
    const Icon = domain.icon

    return (
        <Tooltip
            title={domain.label}
            placement="right"
        >
            <Box
                component="button"
                type="button"
                aria-label={domain.label}
                aria-pressed={active}
                disabled={domain.disabled}
                onClick={() =>
                    onChange(domain.id)
                }
                sx={{
                    width: '100%',
                    height: 36,
                    flexShrink: 0,
                    p: 0,
                    border: 0,
                    borderLeft: '2px solid',
                    borderLeftColor: active
                        ? 'text.primary'
                        : 'transparent',
                    borderRadius: 0,
                    color: active
                        ? 'text.primary'
                        : 'text.secondary',
                    bgcolor: active
                        ? 'action.selected'
                        : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: domain.disabled
                        ? 'default'
                        : 'pointer',

                    '&:hover': {
                        bgcolor: domain.disabled
                            ? 'transparent'
                            : 'action.hover',
                        color: domain.disabled
                            ? 'text.disabled'
                            : 'text.primary',
                    },

                    '&:focus-visible': {
                        outline: '1px solid',
                        outlineColor:
                            'text.secondary',
                        outlineOffset: -1,
                    },

                    '&:disabled': {
                        color: 'text.disabled',
                        opacity: 0.6,
                    },
                }}
            >
                <Icon sx={{ fontSize: 19 }} />
            </Box>
        </Tooltip>
    )
}

type DomainSidebarProps = {
    domain: DomainItem
    currentPath: string
    drawer?: boolean
    onNavigate?: () => void
}

const DomainSidebar = ({
    domain,
    currentPath,
    drawer = false,
    onNavigate,
}: DomainSidebarProps) => {
    const rootItem: NavigationItem | null =
        domain.path
            ? {
                  id: `${domain.id}-root`,
                  label: domain.label,
                  path: domain.path,
                  icon: domain.icon,
                  badge: domain.badge,
                  disabled: domain.disabled,
              }
            : null

    return (
        <Box
            sx={{
                width: drawer
                    ? '100%'
                    : DOMAIN_SIDEBAR_WIDTH,
                flexShrink: 0,
                height: '100%',
                minHeight: 0,
                overflowY: 'auto',
                borderRight: drawer
                    ? 0
                    : '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Box
                sx={{
                    height: 34,
                    px: 1.25,
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography
                    variant="caption"
                    noWrap
                    sx={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: 'text.secondary',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                    }}
                >
                    {domain.label}
                </Typography>
            </Box>

            <List disablePadding>
                {rootItem && (
                    <NavigationRow
                        item={rootItem}
                        currentPath={currentPath}
                        onNavigate={onNavigate}
                    />
                )}

                {domain.children?.map(item => (
                    <NavigationRow
                        key={item.id}
                        item={item}
                        currentPath={currentPath}
                        onNavigate={onNavigate}
                    />
                ))}

                {!rootItem &&
                    !domain.children?.length && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: 'block',
                                px: 1.25,
                                py: 1,
                                fontSize: '0.75rem',
                            }}
                        >
                            No navigation items
                        </Typography>
                    )}
            </List>
        </Box>
    )
}

type NavigationRowProps = {
    item: NavigationItem
    currentPath: string
    depth?: number
    onNavigate?: () => void
}

const NavigationRow = ({
    item,
    currentPath,
    depth = 0,
    onNavigate,
}: NavigationRowProps) => {
    const hasChildren = Boolean(
        item.children?.length,
    )

    const itemIsActive = pathMatches(
        currentPath,
        item.path,
    )

    const childIsActive =
        item.children?.some(child =>
            itemContainsPath(
                child,
                currentPath,
            ),
        ) ?? false

    const selected =
        itemIsActive || childIsActive

    const [expanded, setExpanded] =
        useState(childIsActive)

    useEffect(() => {
        if (childIsActive) {
            setExpanded(true)
        }
    }, [childIsActive])

    const Icon = item.icon

    if (hasChildren) {
        return (
            <>
                <ListItemButton
                    selected={selected}
                    disabled={item.disabled}
                    aria-expanded={expanded}
                    onClick={() =>
                        setExpanded(
                            value => !value,
                        )
                    }
                    sx={{
                        height: 27,
                        minHeight: 27,
                        py: 0,
                        pr: 0.75,
                        pl:
                            0.5 +
                            depth * 1.75,
                        borderRadius: 0,
                        color: selected
                            ? 'text.primary'
                            : 'text.secondary',

                        '&:hover': {
                            bgcolor:
                                'action.hover',
                            color: 'text.primary',
                        },

                        '&.Mui-selected': {
                            bgcolor:
                                'transparent',
                            color: 'text.primary',

                            '&:hover': {
                                bgcolor:
                                    'action.hover',
                            },
                        },

                        '&.Mui-focusVisible': {
                            outline:
                                '1px solid',
                            outlineColor:
                                'text.secondary',
                            outlineOffset: -1,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 17,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems:
                                'center',
                            justifyContent:
                                'center',
                        }}
                    >
                        {expanded ? (
                            <ExpandMore
                                sx={{
                                    fontSize: 15,
                                }}
                            />
                        ) : (
                            <ChevronRight
                                sx={{
                                    fontSize: 15,
                                }}
                            />
                        )}
                    </Box>

                    {Icon && (
                        <ListItemIcon
                            sx={{
                                minWidth: 23,
                                color: 'inherit',
                            }}
                        >
                            <Icon
                                sx={{
                                    fontSize: 16,
                                }}
                            />
                        </ListItemIcon>
                    )}

                    <ListItemText
                        primary={item.label}
                        slotProps={{
                            primary: {
                                noWrap: true,
                                sx: {
                                    fontSize:
                                        '0.75rem',
                                    lineHeight: 1,
                                    fontWeight:
                                        selected
                                            ? 500
                                            : 400,
                                },
                            },
                        }}
                    />

                    {item.badge !==
                        undefined && (
                        <NavigationBadge
                            value={item.badge}
                        />
                    )}
                </ListItemButton>

                <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                >
                    <List disablePadding>
                        {item.children?.map(
                            child => (
                                <NavigationRow
                                    key={
                                        child.id
                                    }
                                    item={child}
                                    currentPath={
                                        currentPath
                                    }
                                    depth={
                                        depth + 1
                                    }
                                    onNavigate={
                                        onNavigate
                                    }
                                />
                            ),
                        )}
                    </List>
                </Collapse>
            </>
        )
    }

    if (!item.path) {
        return null
    }

    return (
        <ListItemButton
            component={NavLink}
            to={item.path}
            selected={itemIsActive}
            disabled={item.disabled}
            onClick={onNavigate}
            sx={{
                height: 27,
                minHeight: 27,
                py: 0,
                pr: 0.75,
                pl: 1 + depth * 1.75,
                borderRadius: 0,
                color: itemIsActive
                    ? 'text.primary'
                    : 'text.secondary',

                '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'text.primary',
                },

                '&.Mui-selected': {
                    bgcolor: 'action.selected',
                    color: 'text.primary',

                    '&:hover': {
                        bgcolor:
                            'action.selected',
                    },
                },

                '&.active': {
                    bgcolor: 'action.selected',
                    color: 'text.primary',
                },

                '&.Mui-focusVisible': {
                    outline: '1px solid',
                    outlineColor:
                        'text.secondary',
                    outlineOffset: -1,
                },
            }}
        >
            {Icon && (
                <ListItemIcon
                    sx={{
                        minWidth: 23,
                        color: 'inherit',
                    }}
                >
                    <Icon
                        sx={{ fontSize: 16 }}
                    />
                </ListItemIcon>
            )}

            <ListItemText
                primary={item.label}
                slotProps={{
                    primary: {
                        noWrap: true,
                        sx: {
                            fontSize:
                                '0.75rem',
                            lineHeight: 1,
                            fontWeight:
                                itemIsActive
                                    ? 500
                                    : 400,
                        },
                    },
                }}
            />

            {item.badge !== undefined && (
                <NavigationBadge
                    value={item.badge}
                />
            )}
        </ListItemButton>
    )
}

const NavigationBadge = ({
    value,
}: {
    value: string | number
}) => {
    return (
        <Typography
            component="span"
            sx={{
                ml: 0.5,
                flexShrink: 0,
                fontSize: '0.6875rem',
                lineHeight: 1,
                color: 'text.secondary',
            }}
        >
            {value}
        </Typography>
    )
}

const pathMatches = (
    currentPath: string,
    itemPath?: string,
): boolean => {
    if (!itemPath) {
        return false
    }

    const normalizedCurrent =
        normalizePath(currentPath)

    const normalizedItem =
        normalizePath(itemPath)

    return (
        normalizedCurrent ===
            normalizedItem ||
        normalizedCurrent.startsWith(
            `${normalizedItem}/`,
        )
    )
}

const normalizePath = (
    path: string,
): string => {
    if (path === '/') {
        return path
    }

    return path.replace(/\/+$/, '')
}

const itemContainsPath = (
    item: NavigationItem,
    currentPath: string,
): boolean => {
    if (
        pathMatches(
            currentPath,
            item.path,
        )
    ) {
        return true
    }

    return (
        item.children?.some(child =>
            itemContainsPath(
                child,
                currentPath,
            ),
        ) ?? false
    )
}

const domainContainsPath = (
    domain: DomainItem,
    currentPath: string,
): boolean => {
    if (
        pathMatches(
            currentPath,
            domain.path,
        )
    ) {
        return true
    }

    return (
        domain.children?.some(item =>
            itemContainsPath(
                item,
                currentPath,
            ),
        ) ?? false
    )
}

