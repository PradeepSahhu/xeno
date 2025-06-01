import { Router } from "express";
import { getCampaignById } from "../controllers/communicationLog.controllers.js";

const router = Router();

router.route("/getCampaign/:campaignId").get(getCampaignById);

export default router;
