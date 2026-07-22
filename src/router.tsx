import { createBrowserRouter, createHashRouter } from "react-router";
import { DefaultRoute } from "./pages/route";

const env = import.meta.env.VITE_ROUTER === "hash" ? "hash" : "browser";
console.log(env);
export const router = env === "hash" ? createHashRouter([DefaultRoute]) : createBrowserRouter([DefaultRoute]);
