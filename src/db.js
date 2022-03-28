
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("erorr", (erorr) => console.log("DB Erorr", erorr));
db.once("open", () => console.log("Connected to DB"));
