import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 4000;
const logger = morgan("dev");
const handlehome = (req, res) => {
  return res.send("<h1>this is home</h1>");
};
const handleLogin = (req, res) => {
  return res.send({ message: "let's go login" });
};
app.use(logger);
app.get("/", handlehome);
app.get("/login", handleLogin);

const handlelistening = () =>
  console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, handlelistening);
