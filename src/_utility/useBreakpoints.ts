import { useMediaQuery } from "@mui/material";

export const useBreakpoints = () => {
    const xs = useMediaQuery((t) => t.breakpoints.only("xs"));
    const sm = useMediaQuery((t) => t.breakpoints.only("sm"));
    const md = useMediaQuery((t) => t.breakpoints.only("md"));
    const lg = useMediaQuery((t) => t.breakpoints.only("lg"));
    const xl = useMediaQuery((t) => t.breakpoints.only("xl"));

    const mobile = xs;
    const mobileLandscape = sm;
    const tablet = md;
    const desktop = lg ?? xl;

    return {
        xs,
        sm,
        md,
        lg,
        xl,
        mobile,
        mobileLandscape,
        tablet,
        desktop,
    };
};
