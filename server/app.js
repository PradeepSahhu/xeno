import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import orderRouter from "./Routes/orders.routes.js";
import customerRouter from "./Routes/customers.routes.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/orders/", orderRouter);
app.use("/api/customers", customerRouter);

export { app };
