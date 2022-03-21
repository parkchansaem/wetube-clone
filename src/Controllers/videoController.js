import Video from "../models/Video";

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  res.render("edit", { pageTitle: `Editing ${video.title} `, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "video not found " });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  res.redirect(`/videos/${id}`);
};
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createAt: "desc" });
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
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (erorr) {
    return res.render("upload", { pageTitle: "upload", erorr: erorr._message });
  }
};
export const getDelete = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(`^${keyword}`, "i") },
    });
  }
  return res.render("search", { pageTitle: "search", videos });
};
//
