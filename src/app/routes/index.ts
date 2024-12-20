import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { BlogRoutes } from "../modules/blog/blog.route";
// import { BlogRoutes } from "../modules/blog/blog.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/admin",
        route: AdminRoutes,
    },
    {
        path: "/blogs",
        route: BlogRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
