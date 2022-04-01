import express from "express";
import {
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getedit,
  postedit,
  getChangePassword,
  postChangePassword,
} from "../Controllers/uesrController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";
const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getedit).post(postedit);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", see);
export default userRouter;
