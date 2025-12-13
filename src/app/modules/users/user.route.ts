import { Router } from "express";
import { UserController } from "./user.controller.js";
import { checkAuth } from "../../middlewares/authCheck.js";
import { UserRole } from "./user.interface.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: User
 *     description: User management endpoints
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users(Admin only)
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No users found
 */
router.get("/", checkAuth(UserRole.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
