import { Router } from "express";
import { ProfileController } from "./profile.controller.js";
import { checkAuth } from "../../middlewares/authCheck.js";
import { multerUpload } from "../../config/multer.config.js";
import { compressFile } from "../../middlewares/compressFile.js";
import { UserRole } from "../users/user.interface.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Profile
 *     description: User profile management
 */

/**
 * @openapi
 * /profile/update-profile-picture:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: Bad request
 */
router.patch(
  "/update-profile-picture",
  checkAuth(UserRole.USER, UserRole.ADMIN),
  multerUpload.single("profilePic"),
  compressFile,
  ProfileController.updateProfilePicture
);

export const ProfileRoutes = router;
