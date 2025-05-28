import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { app } from "./app.js";
import DatabaseConnection from "./utils/DatabaseConnection.utils.js";
import { connectKafkaProducker } from "./Services/kafka/producker.kafka.js";

import dotenv from "dotenv";
import { User } from "./models/users.models.js";
dotenv.config();
// const app = express();

console.log(process.env.GOOGLE_CLIENT_ID);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accesstoken, refreshToken, profile, done) => {
      // can store this data in db.

      try {
        let usr = await User.findOne({ googleId: profile.id });
        console.log("the user is : " + usr);

        if (usr) {
          usr.lastLogin = new Date();
          await usr.save();
          return done(null, usr);
        }
        console.log("this is the route");

        usr = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          lastLogin: new Date(),
          createdAt: new Date(),
        });

        console.log("newly created user" + usr);

        const savedUser = await usr.save();
        console.log("the saved user is : " + savedUser);
        // console.log("New user created:", savedUser._id.toString());
        return done(null, savedUser);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }

      //   console.log(profile.displayName);
      //   console.log(profile.emails);
      //   console.log(profile.id);

      return done(null, savedUser);
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id.toString()));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      return done(null, user);
    }
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

app.get("/", (req, res) => {
  res.send("<a href='/auth/googles'> Login with google</a>");
});

app.get(
  "/auth/googles",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  res.send(`Welcome ${req.user.name}`);
});

app.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/");
  });
});

DatabaseConnection().then(() => {
  connectKafkaProducker().then(() => {
    app.listen(3000, () => {
      console.log("server is running");
    });
  });
});
