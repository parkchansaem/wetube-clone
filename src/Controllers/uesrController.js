import User from "../models/User";

export const Edituser = (req, res) => res.send("Edit User");
export const Remove = (req, res) => res.send("Remove");
export const getJoin = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { email, password, name, location, username } = req.body;
  await User.create({
    email,
    password,
    name,
    location,
    username,
  });
  res.render("join", { pageTitle: "join" });
};
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("user See");
