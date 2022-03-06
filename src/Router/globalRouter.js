import express from "express";
import { join, login, logout } from "../Controllers/uesrController";
import { Trending, search } from "../Controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", Trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

globalRouter.get("/search", search);

export default globalRouter;
