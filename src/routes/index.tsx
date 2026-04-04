import { lazy } from "react";
import {
    createBrowserRouter,
    type RouteObject,
} from "react-router";

const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ApiDemoPage = lazy(() => import("@/pages/ApiDemoPage"));

export interface RouteMeta {
    title?: string;
}

export interface AppRouteObject extends Omit<RouteObject, "meta"> {
    meta?: RouteMeta;
}

const routes: AppRouteObject[] = [
    {
        path: "/",
        element: <HomePage />,
        meta: {
            title: "首页",
        },
    },
    {
        path: "/api-demo",
        element: <ApiDemoPage />,
        meta: {
            title: "API 演示",
        },
    },
    {
        path: "*",
        element: <NotFoundPage />,
        meta: {
            title: "页面未找到",
        },
    },
];

export const router = createBrowserRouter(routes as RouteObject[]);

export { routes };
