import type { RouteObject } from "react-router";
import { InboundPalletDetailPage } from "./page";

export const InboundPalletDetailRoute: RouteObject = {
    path: "inbound/pallets/:palletId",
    Component: InboundPalletDetailPage,
};
