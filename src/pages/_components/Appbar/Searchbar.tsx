import { Box, ClickAwayListener, Fade, InputBase, Paper, Popper, Typography } from '@mui/material'
import { useCallback, useRef, useState, type KeyboardEvent } from 'react'

type MenuControls = {
    open: boolean
    onClose: () => void
    onOpen: () => void
}

const useMenuControls = (): MenuControls => {
    const [open, setOpen] = useState(false)

    const onClose = useCallback(() => {
        setOpen(false)
    }, [])

    const onOpen = useCallback(() => {
        setOpen(true)
    }, [])

    return {
        open,
        onClose,
        onOpen,
    }
}

export const Searchbar = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const anchorRef = useRef<HTMLDivElement>(null)
    const controls = useMenuControls()

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Escape') {
                controls.onClose()
                inputRef.current?.blur()
            }
        },
        [controls],
    )

    return (
        <ClickAwayListener onClickAway={controls.onClose}>
            <Box
                sx={{
                    position: 'relative',
                    flex: 1,
                    mx: '10px',
                    my: '5px',
                }}
            >
                <Box
                    ref={anchorRef}
                    sx={{
                        borderRadius: '5px',
                        border: '1px solid',
                        borderColor: 'divider',
                        px: '5px',
                        
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },

                        '&:focus-within': {
                            outline: '1px solid',
                            outlineOffset: -1,
                            outlineColor: 'primary.main',
                        },
                    }}
                >
                    <InputBase
                        inputRef={inputRef}
                        onFocus={controls.onOpen}
                        onKeyDown={handleKeyDown}
                        placeholder="Search..."
                        inputProps={{
                            'aria-label': 'Search',
                            'aria-expanded': controls.open,
                        }}
                        sx={{
                            width: '100%',
                            fontSize: '12px',
                        }}
                    />
                </Box>

                <SearchResults anchor={anchorRef.current} open={controls.open} />
            </Box>
        </ClickAwayListener>
    )
}

type SearchResultsProps = {
    anchor: HTMLElement | null
    open: boolean
}

const SearchResults = ({ anchor, open }: SearchResultsProps) => {
    return (
        <Popper
            open={open}
            anchorEl={anchor}
            placement="bottom-start"
            transition
            sx={{
                zIndex: theme => theme.zIndex.modal,
                width: anchor?.offsetWidth ?? 0,
            }}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={150}>
                    <Paper
                        variant="outlined"
                        sx={{
                            mt: 0.5,
                            width: '100%',
                            height: 300,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption">Search Results</Typography>
                    </Paper>
                </Fade>
            )}
        </Popper>
    )
}
