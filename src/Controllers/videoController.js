const fakeUsers = {
  name: "chansaem",
  loggined: true,
};

export const see = (req, res) => res.render("watch");
export const Edit = (req, res) => res.render("edit");
export const Trending = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 62,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 62,
      id: 1,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 62,
      id: 1,
    },
  ];
  return res.render("home", { pageTitle: "home", fakeUsers, videos });
};

export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload video");
