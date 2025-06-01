import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import orderRouter from "./Routes/orders.routes.js";
import customerRouter from "./Routes/customers.routes.js";
import CampaignRouter from "./Routes/campaign.routes.js";
import CampaignLog from "./Routes/communicationlog.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.options(
//   "/api/",
//   cors({
//     origin: "http://localhost:3001",
//     credentials: true,
//   })
// );

app.use(bodyParser.json());

app.use("/api/orders/", orderRouter);
app.use("/api/customers", customerRouter);
app.use("/api/campaign", CampaignRouter);
app.use("/api/log/", CampaignLog);

export { app };
