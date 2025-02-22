import express from "express";
import { LoginUser, registerUser } from "../Models/controllers/User.js";

const Router = express.Router();
// user register
Router.post("/register", registerUser);

// user login

Router.post("/login", LoginUser);

export default Router;
