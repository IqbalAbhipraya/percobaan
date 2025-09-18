const { User } = require('../models');

exports.getMe = async (userId) => {
  if (!userId) return null;
  const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
  return user;
};