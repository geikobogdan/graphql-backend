import jwt from "jsonwebtoken";
import { USER_SECRET } from "./config";

export const readToken = async (req, res, next) => {
  const { token } = await req.session;
  if (token) {
    const { username } = jwt.verify(token, USER_SECRET);

    req.username = username;
  }
  next();
};
