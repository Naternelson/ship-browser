import { Add, Close, Search } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ActionbarMobile = () => {
    const [open, setOpen] = useState(false);
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                zIndex: 1
            }}>
            <IconButton
                sx={{
                    color: "info.main",
                    minWidth: "25px",
                    aspectRatio: 1,
                    borderRadius: "50%",
                    bgcolor: "background.default",
                }}>
                <Add />
            </IconButton>
            <IconButton
                onClick={() => {
                    setOpen(true);
                }}
                size="large"
                color="secondary"
                sx={{
                    bgcolor: "secondary.dark",
                    color: "white",
                    borderRadius: "50%",
                    "&:active, &:focus": { bgcolor: "secondary.main" },
                }}>
                <Search />
            </IconButton>
            <Dialog
                // fullScreen
                open={open}
                slots={{ transition: Transition }}
                onClose={() => {
                    setOpen(false);
                }}
                maxWidth={false}
                slotProps={{
                    paper: {
                        sx: {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,

                            width: "100%",
                            maxWidth: "none",
                            maxHeight: "100%",

                            m: 0,
                            borderRadius: "16px 16px 0 0",
                        },
                    },
                }}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>Search and Filter</Box>
                    <Box>
                        <IconButton
                            onClick={() => {
                                setOpen(false);
                            }}>
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent><Box sx={{minHeight: 100}}></Box></DialogContent>
                <DialogActions>
                    <Box>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                //Apply filters
                                setOpen(false);
                            }}>
                            Apply
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
