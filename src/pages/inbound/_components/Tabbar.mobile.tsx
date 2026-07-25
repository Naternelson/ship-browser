import { matchPath, NavLink, useLocation } from "react-router";
import { defaultTabs } from "../tabs";
import { Box, ButtonBase, Typography } from "@mui/material";

export const TabbarMobile = () => {
    const location = useLocation();

    const activeTab = defaultTabs.find((tab) => {
        const path = tab.path === "." ? "/inbound" : `/inbound/${tab.path}`;

        return matchPath(
            {
                path,
                end: tab.path === ".",
            },
            location.pathname,
        );
    });

    return (
        <Box
            component="nav"
            sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: (theme) => theme.zIndex.appBar,
                display: "flex",
                bgcolor: "background.paper",
                borderTop: "1px solid",
                borderColor: "divider",
                pb: "env(safe-area-inset-bottom)",
                boxShadow: 4,
                paddingBottom: "1rem",
            }}>
            {defaultTabs.map((tab) => {
                const Icon = tab.icon;

                return (
                    <ButtonBase
                        component={NavLink}
                        to={tab.path}
                        end={tab.path === "."}
                        disabled={tab.disabled}
                        key={tab.id}
                        sx={{
                            flex: 1,
                            minWidth: 64,
                            minHeight: 64,
                            py: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: 0.25,
                            color: "text.secondary",
                            "&.active": {
                                color: "primary.main",
                            },
                        }}>
                        {Icon && <Icon fontSize="small" />}

                        <Typography
                            variant="caption"
                            color="inherit"
                            sx={{
                                lineHeight: 1.2,
                                color: activeTab?.id === tab.id ? "primary.main" : "text.secondary",
                            }}>
                            {tab.label}
                        </Typography>
                    </ButtonBase>
                );
            })}
        </Box>
    );
};
