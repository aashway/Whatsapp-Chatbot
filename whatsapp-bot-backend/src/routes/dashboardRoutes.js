import express from "express";
import auth from "../middleware/auth.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// routes must come AFTER router is created
router.get("/", auth, getDashboardStats);

export default router;
