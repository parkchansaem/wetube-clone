import express from "express";
import {
  Remove,
  Edituser,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
} from "../Controllers/uesrController";
const userRouter = express.Router();

userRouter.get("/edit", Edituser);
userRouter.get("/remove", Remove);
userRouter.get("/logout", logout);
userRouter.get("/:id", see);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
export default userRouter;
