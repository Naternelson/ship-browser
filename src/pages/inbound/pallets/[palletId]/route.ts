import type { RouteObject } from "react-router";
import { InboundPalletDetailPage } from "./page";
import { loader } from "./loader";

export const InboundPalletDetailRoute: RouteObject = {
    path: "inbound/pallets/:palletId",
    Component: InboundPalletDetailPage,
    loader: loader,
};
