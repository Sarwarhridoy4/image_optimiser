import { Router } from "express";

const router = Router();

// Define test route
router.get("/test", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth route is working fine",
  });
});

export const AuthRoutes = router;
