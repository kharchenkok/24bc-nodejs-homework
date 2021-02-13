import { Router } from "express";
import { asyncWrapper } from "../helpers/async-wrapper.js";
import { authorize } from "../helpers/authorize.js";
import { composeUsers } from "./users.serializer.js";
import { usersService } from "./users.service.js";

const router = Router();


router.get(
  "/current",
  authorize,
  asyncWrapper(async (req, res) => {
     const user = await usersService.getUser(req.userId);
     const {email,subscription}=user
     const currentUser={email,subscription}
    return res.status(200).send(composeUsers(currentUser));
  })
);

// router.patch("/", validate(updateContactsSchema),validate(contactsIdSchema),updateContact)
export const usersController = router;

