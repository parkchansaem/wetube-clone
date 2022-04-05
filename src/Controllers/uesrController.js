import User from "../models/User";
import fetch from "node-fetch";
import bcryptjs from "bcryptjs";
export const Edituser = (req, res) => res.send("Edit User");
export const Remove = (req, res) => res.send("Remove");
export const getJoin = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res) => {
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
  const user = await User.findOne({ username, socialOnly: false });
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
export const startGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const baseUrl = "https://github.com/login/oauth/authorize";
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiURL = "https://api.github.com";
    const userData = await (
      await fetch(`${apiURL}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailDeta = await (
      await fetch(`${apiURL}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    console.log(emailDeta);
    const emailObj = emailDeta.find(
      (email) => email.primary === true && email.verified === true
    );

    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatarUrl,
        name: userData.name ? userData.name : userData.login,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

export const getedit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit profile" });
};
export const postedit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username },
    file,
  } = req;
  const updatausers = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
    },
    { new: true }
  );
  req.session.user = updatausers;
  return res.redirect("/user/edit");
};
export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redircet("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const oldPasswordCheck = bcryptjs.compare(oldPassword, user.password);
  if (!oldPasswordCheck) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      erorrMessage: "The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("/");
};
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).render("404", { pageTitle: "User not found." });
  }
  return res.render("users/profile", { pageTitle: user.name, user });
};
