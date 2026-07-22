import { matchPath, NavLink, useLocation } from "react-router";
import { defaultTabs } from "../tabs";
import { Box,  ButtonBase, Typography } from "@mui/material";

export const TabbarMobile = () => {
    const location = useLocation();
    const activeTab = defaultTabs.find((t) => {
        if (t.path === ".")
            return matchPath(
                {
                    path: "/inbound",
                    end: true,
                },
                location.pathname,
            );
        return matchPath(
            {
                path: `/inbound/${t.path}`,
                end: false,
            },
            location.pathname,
        );
    });

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "stretch",
                bottom: 0,
                left: 0,
                right: 0,
                overflowX: "auto",
                borderTop: "1px solid",
                borderColor: "divider",
            }}>
            {defaultTabs.map((t) => {
                const Icon = t.icon && t.icon;
                return (
                    <ButtonBase
                        className={activeTab?.id === t.id ? "active" : ""}
                        component={NavLink}
                        to={t.path}
                        end={t.path === "."}
                        disabled={t.disabled}
                        key={t.id}
                        sx={{
                            bgcolor: "background.default",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minWidth: "60px",
                            color: "text.secondary",
                            overflow: "hidden",
                            padding: "0.5rem",
                            "&.active": {
                                color: "primary.main",
                            },
                        }}>
                        {Icon && <Icon fontSize="small" />}
                        <Typography variant="caption" sx={{ color: "inherit" }}>
                            {t.label}
                        </Typography>
                    </ButtonBase>
                );
            })}
        </Box>
    );
};
