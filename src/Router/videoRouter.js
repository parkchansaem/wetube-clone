import express from "express";
import { Edit, see, deleteVideo, upload } from "../Controllers/videoController";

const videoRouter = express.Router();
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", Edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
