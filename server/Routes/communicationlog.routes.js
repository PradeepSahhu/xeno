import { Router } from "express";
import { getCampaignById } from "../controllers/communicationLog.controllers.js";

const router = Router();

router.route("/getCampaign").get(getCampaignById);

export default router;
