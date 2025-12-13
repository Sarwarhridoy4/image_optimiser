import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { UserRoutes } from "../modules/users/user.route.js";


export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  }
  
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});