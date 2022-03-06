import express from "express";
import { Remove, Edituser, see, logout } from "../Controllers/uesrController";
const userRouter = express.Router();

userRouter.get("/edit", Edituser);
userRouter.get("/remove", Remove);
userRouter.get("/:id", see);
userRouter.get("/logout", logout);
export default userRouter;
