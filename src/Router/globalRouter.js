import express from "express";
import {
  getJoin,
  postJoin,
  login,
  logout,
  getlogin,
  postlogin,
} from "../Controllers/uesrController";
import { home, search } from "../Controllers/videoController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(postJoin);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getlogin)
  .post(postlogin);
globalRouter.get("/search", search);

export default globalRouter;
