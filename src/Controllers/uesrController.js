import User from "../models/User";
import bcryptjs from "bcryptjs";
export const Edituser = (req, res) => res.send("Edit User");
export const Remove = (req, res) => res.send("Remove");
export const getJoin = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { email, password, password2, name, location, username } = req.body;
  const usernameExists = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "join",
      erorrMessage: "password dose not match",
    });
  }
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle: "join",
      erorrMessage: "username or email fail",
    });
  }
  try {
    await User.create({
      email,
      password,
      name,
      location,
      username,
    });
    return res.redirect("/login");
  } catch (erorr) {
    return res
      .status(404)
      .render("join", { pageTitle: "join", erorr: erorr._message });
  }
};
export const getlogin = (req, res) =>
  res.render("login", { pageTitle: "login" });
export const postlogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "login",
      erorrMessage: "An account with this username does not exists",
    });
  }
  const ok = await bcryptjs.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .render("login", { pageTitle: "login", erorrMessage: "wrong password" });
  }
  console.log("login user");
  req.session.loggedIn = true;
  req.session.user = user;

  res.redirect("/");
};
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("user See");
