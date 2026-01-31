import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { UserRoutes } from "../modules/users/user.route.js";
import { ProfileRoutes } from "../modules/profile/profile.route.js";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/profile",
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});