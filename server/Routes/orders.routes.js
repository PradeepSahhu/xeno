import { Router } from "express";

import { addOrders } from "../controllers/orders.controllers.js";

const router = Router();

router.route("/addOrder").post(addOrders);

export default router;
