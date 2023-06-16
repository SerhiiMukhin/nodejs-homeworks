const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { HttpError, controllerWrapper, avatarHandler } = require('../helpers');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const avatarsPath = path.join(__dirname, '../', 'public', 'avatars');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: 'starter',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({
    name,
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204);
};

const changeAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const resultUpload = path.join(avatarsPath, originalname);
  await fs.rename(tmpUpload, resultUpload);

  await avatarHandler(resultUpload);

  const newFileName = `${userId}_${originalname}`;
  const avatarURL = path.join('avatars', newFileName);

  await User.findByIdAndUpdate(userId, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  changeAvatar: controllerWrapper(changeAvatar),
};
