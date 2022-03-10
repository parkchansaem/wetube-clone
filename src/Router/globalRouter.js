import express from "express";
import { join, login, logout } from "../Controllers/uesrController";
import { home, search } from "../Controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
