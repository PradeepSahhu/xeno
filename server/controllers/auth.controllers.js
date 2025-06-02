import passport from "passport";
import session from "express-session";

const getAuthenticatedUser = (req, res) => {
  // res.send(`Welcome ${req.user.name}`);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("someone is fetching from here");
  return res.status(200).json(req.user);
};

export { getAuthenticatedUser };
