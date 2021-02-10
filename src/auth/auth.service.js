import { Conflict } from "../helpers/error.constructors.js";
import { userModel } from "../users/user.model.js";
// import {
//   Conflict,
//   NotFound,
//   Forbidden,
// } from "../helpers/error.constructors.js";
import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

class AuthService {
  async register(userParams) {
  
    const { email,password,subscription } = userParams;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Conflict(`Email "${email}" in use`);
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const passwordHash = await bcryptjs.hash(password, saltRounds);
    const newUser = await userModel.create({
      email,
      passwordHash,
      subscription
    });

    return newUser;
  }

//   async signIn(credentials) {
//     // 1. validate req.body +
//     // 2. check if user with such email exists +
//     // 3. if not exist - throw 404 +
//     // 4. if exists:
//     // 4.1. check password +
//     // 4.2. password is wrong - throw 403 +
//     // 4.3. password is right:
//     // 4.3.1. generate token for user +
//     // 4.3.2. send successful response
//     const { email, password } = credentials;
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       throw new NotFound(`User with email ${email} was not found`);
//     }

//     const isRightPassword = await bcryptjs.compare(password, user.passwordHash);
//     if (!isRightPassword) {
//       throw new Forbidden(`Provided password is wrong`);
//     }

//     const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
//     const token = jwt.sign({ uid: user._id }, JWT_SECRET, {
//       expiresIn: JWT_EXPIRES_IN,
//     });

//     return { user, token };
//   }
}

export const authService = new AuthService();