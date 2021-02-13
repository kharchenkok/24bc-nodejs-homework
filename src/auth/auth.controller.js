import { Router } from "express";
import { asyncWrapper } from "../helpers/async-wrapper.js";
import { validate } from "../helpers/validate.js";
import { authService } from "./auth.service.js";
import { composeUsers } from "../users/users.serializer.js";
import Joi from "joi";
import { authorize } from "../helpers/authorize.js";
import { usersService } from "../users/users.service.js";
const router = Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  // token: Joi.string()


});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  token:Joi.string()
});

router.post(
  "/register", validate(registerSchema),
  asyncWrapper(async (req, res) => {
    const newUser = await authService.register(req.body);
    res.status(201).send(composeUsers(newUser));
  })
);

router.post(
  "/login",
  validate(loginSchema),
  asyncWrapper(async(req,res)=>{
     const { user, token } = await authService.login(req.body);
     const loginUser=await usersService.updateUser(user.id,{"token":token})
     res.cookie("token", token, { httpOnly: true, signed: true });
     return res.status(201).send({
      user: composeUsers(loginUser),
    });
  })

)

router.post(
  "/logout",
  authorize,
  asyncWrapper(async(req,res)=>{
     await usersService.updateUser(req.userId, {"token":null})
      res.cookie("token",null,{httpOnly: true, signed: false})
    return res.status(204).send()
   
  }
))

export const authController = router;


