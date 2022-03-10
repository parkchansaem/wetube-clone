import Video from "../models/Video";

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `watching ` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;

  res.render("edit", { pageTitle: `Editing ` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  res.redirect(`/videos/${id}`);
};
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "home", videos });
  } catch {
    return res.render("sever-error");
  }
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (erorr) {
    return res.render("upload", { pageTitle: "upload", erorr: erorr._message });
  }
};
