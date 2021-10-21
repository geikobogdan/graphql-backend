import { AuthenticationError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import { USER_SECRET } from "../../init/config";
import { db } from "./db";

export const mutations = {
  signUp: (_, user) => {
    db.push(user);
    return user;
  },
  login: (_, { name, password }, ctx) => {
    const user = db.find((currentUser) => currentUser.name === name);
    const message = "Your credentials are wrong!";
    if (!user) {
      throw new AuthenticationError(message);
    }
    const isUserValid = user.password === password;
    if (!isUserValid) {
      throw new AuthenticationError(message);
    }
    const token = jwt.sign({ username: name }, USER_SECRET);
    ctx.req.session.token = token;

    return user;
  },
};
