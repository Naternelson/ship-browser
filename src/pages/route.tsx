import type { RouteObject } from "react-router";
import { Layout } from "./layout";
import { inventoryRoute } from "./inventory/route";
import { InboundRoute } from "./inbound/route";

export const DefaultRoute: RouteObject = {
    path: "/",
    Component: Layout,
    children: [inventoryRoute, InboundRoute],
};
