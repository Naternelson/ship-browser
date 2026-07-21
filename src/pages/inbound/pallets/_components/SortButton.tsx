import {
    ArrowDropDown,
    ArrowDownward,
    ArrowUpward,
    Check,
    Sort,
} from '@mui/icons-material'
import {
    Box,
    Button,
    Fade,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import {
    useRef,
    useState,
} from 'react'

import type { SortOption } from '../types'
import { usePalletsPage } from './PageContext'

export const SortButton = () => {
    const anchorRef =
        useRef<HTMLButtonElement>(null)

    const [open, setOpen] =
        useState(false)

    const {
        sort,
        setSort,
    } = usePalletsPage()

    const selectSort = (
        type: SortOption,
    ) => {
        setSort({
            ...sort,
            type,
        })

        setOpen(false)
    }

    const toggleDirection = () => {
        setSort({
            ...sort,
            direction:
                sort.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 0.5,
            }}
        >
            <Button
                ref={anchorRef}
                onClick={() =>
                    setOpen(true)
                }
                size="small"
                variant="outlined"
                startIcon={
                    <Sort fontSize="small" />
                }
                endIcon={
                    <ArrowDropDown />
                }
            >
                {sort.type === 'sku'
                    ? 'SKU'
                    : 'Date'}
            </Button>

            <Button
                onClick={toggleDirection}
                size="small"
                variant="outlined"
                aria-label={
                    sort.direction === 'asc'
                        ? 'Change to descending'
                        : 'Change to ascending'
                }
                sx={{
                    minWidth: 32,
                    px: 0.5,
                }}
            >
                {sort.direction ===
                'asc' ? (
                    <ArrowUpward fontSize="small" />
                ) : (
                    <ArrowDownward fontSize="small" />
                )}
            </Button>

            <Menu
                slots={{
                    transition: Fade,
                }}
                anchorEl={
                    anchorRef.current
                }
                open={open}
                onClose={() =>
                    setOpen(false)
                }
                variant="menu"
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        minWidth: 200,
                    }}
                >
                    <Typography variant="caption">
                        Sort by
                    </Typography>
                </Box>

                <SortMenuItem
                    label="SKU"
                    selected={
                        sort.type === 'sku'
                    }
                    onClick={() =>
                        selectSort('sku')
                    }
                />

                <SortMenuItem
                    label="Date"
                    selected={
                        sort.type === 'date'
                    }
                    onClick={() =>
                        selectSort('date')
                    }
                />
            </Menu>
        </Box>
    )
}

type SortMenuItemProps = {
    label: string
    selected: boolean
    onClick: () => void
}

const SortMenuItem = ({
    label,
    selected,
    onClick,
}: SortMenuItemProps) => {
    return (
        <MenuItem
            selected={selected}
            onClick={onClick}
            sx={{
                fontSize: 12,
            }}
        >
            <ListItemIcon>
                {selected && (
                    <Check fontSize="small" />
                )}
            </ListItemIcon>

            {label}
        </MenuItem>
    )
}