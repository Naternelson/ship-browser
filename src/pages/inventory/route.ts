import type { RouteObject } from "react-router";
import { skusRoute } from "./skus/route";

export const inventoryRoute:RouteObject = {
    path: 'inventory',
    children: [skusRoute]
}