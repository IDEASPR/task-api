// src/controllers/userController.js

let users = [];

const getUsers = (req, res) => {
  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const deleteUser = (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.status(200).json({ message: "User deleted" });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
