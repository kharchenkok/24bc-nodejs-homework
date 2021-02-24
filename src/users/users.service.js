import { userModel } from "./user.model.js";

class UsersService {
  async getUser(userId) {
    return userModel.findById(userId);
  }
  async updateUser(userId,param) {
    // console.log("param", param);
    return userModel.findByIdAndUpdate(userId,param,{
      new: true,
    });
  }
}

export const usersService = new UsersService();