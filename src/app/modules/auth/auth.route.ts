import { Router } from "express";
import { multerUpload } from "../../config/multer.config.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { userRegisterSchema, loginSchema } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";
import { compressFile } from "../../middlewares/compressFile.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication & registration endpoints
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user with profile picture and certificate PDF
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               profilePic:
 *                 type: string
 *                 format: binary
 *               certificatePdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation or upload error
 */
router.post(
  "/register",
  multerUpload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "certificatePdf", maxCount: 1 },
  ]),
  compressFile,
  validateRequest(userRegisterSchema),
  AuthController.registerUser
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                     user:
 *                       type: object
 *       401:
 *         description: Invalid email or password
 */
router.post(
  "/login",
  validateRequest(loginSchema),
  AuthController.credentialsLogin
);

export const AuthRoutes = router;
