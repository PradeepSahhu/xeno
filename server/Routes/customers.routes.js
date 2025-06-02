import { Router } from "express";

import {
  addCustomer,
  getAllCustomers,
} from "../controllers/customers.controllers.js";

const router = Router();

router.route("/addCustomer").post(addCustomer);
router.route("/getAllCustomers").get(getAllCustomers);

export default router;
