import { ArrowDropDown } from '@mui/icons-material'
import { Box, Button, ButtonBase, Menu, MenuItem, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { matchPath, NavLink, Outlet, useLocation } from 'react-router'

export const Layout = () => {
    return (
        <Box
            sx={{
                flex: 1,
                outlineOffset: '-2px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: 0,
            }}
        >
            <Tabbar />
            <MobileTabbar />
            <Box sx={{ flex: 1, overflow: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

type Tab = {
    id: string
    label: string
    path: string
    disabled?: boolean
}

const defaultTabs: Tab[] = [
    {
        id: 'overview',
        label: 'Overview',
        path: '.',
    },
    {
        id: 'pallets',
        label: 'Pallets',
        path: 'pallets',
    },
]

const Tabbar = () => {
    const tabs = defaultTabs
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                paddingX: '1rem',
                display: {
                    xs: 'none',
                    md: 'block',
                },
            }}
        >
            {tabs.map(tab => (
                <Box
                    component={NavLink}
                    key={tab.id}
                    to={tab.path}
                    end={tab.path === '.'}
                    sx={{
                        display: 'inline-block',
                        p: 1,
                        px: 2,
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.primary',
                        },
                        '&.active': {
                            color: 'text.primary',
                            borderBottom: 2,
                            borderColor: 'secondary.main',
                        },
                    }}
                >
                    <Typography variant="overline">{tab.label}</Typography>
                </Box>
            ))}
        </Box>
    )
}

const MobileTabbar = () => {
    const anchorRef = useRef<HTMLButtonElement>(null)
    const [open, setOpen] = useState(false)
    const location = useLocation()

    const activeTab =
        defaultTabs.find(tab => {
            if (tab.path === '.') {
                return matchPath(
                    {
                        path: '/inbound',
                        end: true,
                    },
                    location.pathname,
                )
            }

            return matchPath(
                {
                    path: `/inbound/${tab.path}`,
                    end: false,
                },
                location.pathname,
            )
        }) ?? defaultTabs[0]

    return (
        <Box
            sx={{
                display: {
                    xs: 'flex',
                    md: 'none',
                },
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ButtonBase
                ref={anchorRef}
                onClick={() => setOpen(true)}
                disableRipple
                aria-haspopup="menu"
                aria-expanded={open ? 'true' : undefined}
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    py: 0.5,
                    px: 2,
                    color: 'text.secondary',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant="overline"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 'bold',
                    }}
                >
                    {activeTab.label}
                </Typography>

                <ArrowDropDown />
            </ButtonBase>

            <Menu
                anchorEl={anchorRef.current}
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {defaultTabs.map(tab => (
                    <MenuItem
                        key={tab.id}
                        component={NavLink}
                        to={tab.path}
                        end={tab.path === '.'}
                        disabled={tab.disabled}
                        onClick={() => setOpen(false)}
                        sx={{
                            minWidth: 180,
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            color: 'text.secondary',

                            '&:hover': {
                                color: 'text.primary',
                            },

                            '&.active': {
                                color: 'secondary.main',
                            },
                        }}
                    >
                        {tab.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
