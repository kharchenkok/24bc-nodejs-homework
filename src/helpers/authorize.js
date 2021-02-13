import jwt from "jsonwebtoken";
import { Unauthorized } from "./error.constructors.js";

export function authorize(req, res, next) {
   // const { token } = req.signedCookies;
  const token = req.header("Authorization").replace("Bearer ", "");
  let uid;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    uid = payload.uid;
  } catch (err) {
    return next(new Unauthorized("Token is not valid"));
  }

  req.userId = uid;
  next();
}