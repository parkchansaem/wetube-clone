import express from "express";
import {
  getJoin,
  postJoin,
  login,
  logout,
} from "../Controllers/uesrController";
import { home, search } from "../Controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
