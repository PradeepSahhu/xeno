import { Router } from "express";

import { addCustomer } from "../controllers/customers.controllers.js";

const router = Router();

router.route("/addCustomer").post(addCustomer);

export default router;
