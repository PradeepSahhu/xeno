import { Router } from "express";
import passport from "passport";
import session from "express-session";
import { getAuthenticatedUser } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/profile").get(getAuthenticatedUser);
router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/",
  }),
  (_, res) => {
    // res.redirect("/profile");

    // res.status(200).json()
    res.redirect("http://localhost:3000/campaignCreation");
  }
);

export default router;
