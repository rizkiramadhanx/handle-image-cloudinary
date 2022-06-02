import User from "../model/User.js";

export const getAll = (req, res) => {
  User.find({}, (err, user) => {
    res.status(200).json(user);
  });
};

export const addUser = (req, res) => {
  if (!req.file) res.send("ngapain bang !");
  User.create(
    { username: req.body.username, photo: req.file.path.replace(/\\/g, "/") },
    function (err, user) {
      if (err) return res.send(err);
      res.status(200).json({ data: user, path: req.file });
    }
  );
  // res.send(req.file.path.replace(/\\/g, "/"));
};
