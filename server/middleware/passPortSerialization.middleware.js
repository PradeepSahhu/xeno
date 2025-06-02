import { User } from "../models/users.models.js";

export const serilization = (user, done) => done(null, user._id.toString());

export const deserilization = async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      return done(null, user);
    }
  } catch (error) {
    console.log(error);
    done(error, null);
  }
};
