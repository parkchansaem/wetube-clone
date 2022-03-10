import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/chansaem-wetube");

const db = mongoose.connection;

db.on("erorr", (erorr) => console.log("DB Erorr", erorr));
db.once("open", () => console.log("Connected to DB"));
