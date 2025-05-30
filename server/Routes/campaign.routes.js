import { Router } from "express";
import {
  addCampaign,
  getAllCampaign,
} from "../controllers/campaign.controllers.js";

const router = Router();

router.route("/addCampaign").post(addCampaign);

router.route("/getAllCampaign").get(getAllCampaign);

export default router;
