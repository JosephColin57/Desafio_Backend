const User = require("../models/user.model");
const encrypt = require("../lib/encrypt");
const createError = require("http-errors");

async function createUser(user) {
  const userFound = await User.findOne({ email: user.email });

  if (userFound) {
    throw createError(409, "User already exists");
  }

  user.password = await encrypt(user.password);

  return await User.create(user);
}

async function getUserById(id) {
  return await User.findById(id);
}

module.exports = {
  createUser,
  getUserById,
};
    