import { ArrowDownward, ArrowDropDown, ArrowRightAlt, Check, Filter, Sort } from "@mui/icons-material";
import {
    Badge,
    Box,
    Button,
    Checkbox,
    Chip,
    Fade,
    FormControlLabel,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { Row } from "./_components/Row";

/**
 *
 * Goal of this page is to
 * 1. Show a list of pallets currently assigned to be inbounded to symbotic
 * 2. Show the status of each pallet (e.g. waiting for inbound, in progress, completed)
 * 3. Allow the user to select a pallet and view its details (e.g. items, quantity, location)
 * 4. Allow the user to mark a pallet as completed or in progress
 * 5. Assign additional pallets to be inbounded to symbotic
 */
export const PalletsPage = () => {
    return (
        <Box
            sx={{
                padding: "1rem",
                display: "flex",
                flex: 1,
                overflow: "hidden",
                flexDirection: "column",
                minHeight: 0,
            }}>
            <PalletList />
        </Box>
    );
};

const PalletList = () => {
    return (
        <Box
            sx={{
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                flex: 1,
                justifyContent: "space-between",
                overflow: "hidden",
            }}>
            <Box
                sx={{
                    p: 0.5,
                    bgcolor: "background.paper",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FilterButton label="Assigned" value="assigned" count={10} />
                    <FilterButton label="Critical" value="critical" count={5} />
                </Box>
                <Box>
                    <SortButton />
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflow: "auto" }}>
                {Array.from({ length: 200 }).map((_, index) => (
                    <Row key={index} />
                ))}
            </Box>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    fontSize: "10px",
                    px: "1rem",
                    py: "0.25rem",
                    color: "text.secondary",
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}>
                223 Results
            </Box>
        </Box>
    );
};

const FilterButton = ({ label, value, count }: { label: string; value: string; count: number }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormControlLabel
                sx={{ m: 0, fontSize: "12" }}
                slotProps={{ typography: { sx: { fontSize: 12 } } }}
                control={<Checkbox disableRipple sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />}
                label={label}
            />
            <Chip label={count} size="small" variant="filled" />
        </Box>
    );
};

type SortOption = "sku" | "date";

const SortButton = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("sku");

    const selectSort = (option: SortOption) => {
        setSortBy(option);
        setOpen(false);
    };

    return (
        <Box>
            <Button
                ref={ref}
                onClick={() => setOpen(true)}
                size="small"
                sx={{ color: "action.disabled" }}
                variant="outlined"
                startIcon={
                    <Box sx={{ display: "flex", alignItems: "center", position: "relative", marginRight: 1 }}>
                        <Sort fontSize="small" />
                        <ArrowRightAlt
                            fontSize="small"
                            sx={{
                                width: "12",
                                transform: "rotate(90deg)",
                                position: "absolute",
                                left: 12,
                                bgcolor: "background.paper",
                            }}
                        />
                    </Box>
                }
                endIcon={<ArrowDropDown />}>
                {sortBy === "sku" ? "SKU" : " Date"}
            </Button>

            <Menu
                slots={{ transition: Fade }}
                anchorEl={ref.current}
                open={open}
                onClose={() => setOpen(false)}
                variant="menu">
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: 200,
                    }}>
                    <Typography variant="caption">Sort by</Typography>
                </Box>

                <MenuItem selected={sortBy === "sku"} onClick={() => selectSort("sku")} sx={{ fontSize: 12 }}>
                    <ListItemIcon>{sortBy === "sku" && <Check fontSize="small" />}</ListItemIcon>
                    SKU
                </MenuItem>

                <MenuItem selected={sortBy === "date"} onClick={() => selectSort("date")} sx={{ fontSize: 12 }}>
                    <ListItemIcon>{sortBy === "date" && <Check fontSize="small" />}</ListItemIcon>
                    Date
                </MenuItem>
            </Menu>
        </Box>
    );
};
