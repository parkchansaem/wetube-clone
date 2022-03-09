import express from "express";
import morgan from "morgan";
import globalRouter from "./Router/globalRouter";
import userRouter from "./Router/uesrRouter";
import videoRouter from "./Router/videoRouter";

const app = express();
const PORT = 5000;
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

const handlelistening = () =>
  console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, handlelistening);
