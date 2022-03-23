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

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getlogin).post(postlogin);
globalRouter.get("/search", search);

export default globalRouter;
