import express from "express";
import {
  postEdit,
  getEdit,
  watch,
  deleteVideo,
  getUpload,
  postUpload,
} from "../Controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
