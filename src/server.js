import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { contactsController } from "./contacts/contacts.controller.js";
import { getPaths } from "./helpers/utils.js"
import { authController } from "./auth/auth.controller.js";
import cookieParser from "cookie-parser";
import {usersController} from "./users/users.controller.js"
export class ContactsServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initConfig();
    await this.initDatabase()
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }
  initConfig() {

    const { __dirname } = getPaths(import.meta.url);
    dotenv.config({ path: path.join(__dirname, "../.env") });
    
  }

  async initDatabase() {
    try{
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("Database connection successful");

    }catch(error){
      console.error("there was an error:", error.message);
      process.exit(1);
    }
  }
  
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan("combined"));
    this.server.use(cookieParser(process.env.COOKIE_SECRET))
  }

  initRoutes() {
    this.server.use("/contacts", contactsController);
    this.server.use("/auth", authController);
    this.server.use("/users", usersController);
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { PORT } = process.env;
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}