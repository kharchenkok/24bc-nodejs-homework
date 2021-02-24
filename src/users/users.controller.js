import { Router } from "express";
import { asyncWrapper } from "../helpers/async-wrapper.js";
import { authorize } from "../helpers/authorize.js";
import { composeUsers } from "./users.serializer.js";
import { usersService } from "./users.service.js";
import Joi from "joi";
import { validate } from "../helpers/validate.js";
import { uploadAvatar } from "../helpers/avatar.js";

const subscrSchema = Joi.object({
  subscription: Joi.string().required().valid('free', 'pro', 'premium'),
});
const avatarSchema = Joi.object({
  avatarURL: Joi.string(),
});
const router = Router();

router.get(
  "/current",
  authorize,
  asyncWrapper(async (req, res) => {
     const user = await usersService.getUser(req.userId);
     const {email,subscription,avatarURL}=user
     const currentUser={email,subscription,avatarURL}
    return res.status(200).send(composeUsers(currentUser));
  })
);

router.patch("/",authorize, validate(subscrSchema), asyncWrapper(async(req,res)=>{
  const { subscription } = req.body;
  const updateUser = await usersService.updateUser(req.userId, { "subscription": subscription, })
  return res.status(200).send(composeUsers(updateUser));
}))
router.patch("/avatar", authorize, uploadAvatar, asyncWrapper(async (req, res) => {
  const { filename } = req.file;
  // console.log("filename",filename);
  const updateUser = await usersService.updateUser(req.userId, { "avatarURL": `http://localhost:${process.env.PORT}/images/${filename}` })
  return res.status(200).send(composeUsers(updateUser));
}))


export const usersController = router;

