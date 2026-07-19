import { type RouteObject } from "react-router";
import { Layout } from "./layout";
import { OverviewPage } from "./page";
import { PalletsRoute } from "./pallets/route";
export const InboundRoute: RouteObject = {
    path: "inbound",
    Component: Layout,
    children: [
        {
            index: true,
            Component: OverviewPage,
        },
        PalletsRoute,
    ],
};
