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
      // token: { type: String, required: false, default: ""}
});

// collection name => users
export const userModel = mongoose.model("User", userSchema);

