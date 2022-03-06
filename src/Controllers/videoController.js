export const see = (req, res) => res.send(`See Video ${req.params.id}`);
export const Edit = (req, res) => res.send("Edit");
export const Trending = (req, res) => res.send("Homepages video");
export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload video");
