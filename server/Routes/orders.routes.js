import { Router } from "express";

import { addOrders, getAllOrders } from "../controllers/orders.controllers.js";

const router = Router();

router.route("/addOrder").post(addOrders);
router.route("/getAllOrders").get(getAllOrders);

export default router;
