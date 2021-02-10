import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
      passwordHash: { type: String, required: true },
      subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
      },
      token: { type: String, required: false, default: ""}
});

// collection name => users
export const userModel = mongoose.model("User", userSchema);






// import mongoose from "mongoose";
// import { composeUsers } from "./users.serializer";

// const { Schema } = mongoose;

// const userSchema = new Schema({

//   email: { type: String, required: true, unique: true },
//   passwordHash: { type: String, required: true },
//   subscription: {
//     type: String,
//     enum: ["free", "pro", "premium"],
//     default: "free"
//   },
//   token: { type: String, required: false, default: ""}
// });

// // collection name => users
// const userModel = mongoose.model("User", userSchema);

// async function addUser(req,res) {
//     try {
//       const newUser = await userModel.create(req.body)
//       return res.status(201).send(composeUsers(newUser));
//     } catch (error) {
//       console.error("there was an error:", error.message);
//     }
//   }

//   export {addUser}