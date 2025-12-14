import express from "express";
import {
  createCampaign,
  sendCampaign,
  getCampaigns,
} from "../controllers/campaignController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createCampaign);
router.post("/:id/send", auth, sendCampaign);
router.get("/", auth, getCampaigns);

export default router;
