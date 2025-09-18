const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token tidak ditemukan. Silakan login terlebih dahulu.',
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: 'Token tidak valid. User tidak ditemukan.',
      });
    }

    req.user = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token tidak valid.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token sudah kadaluarsa. Silakan login ulang.' });
    }
    return res.status(500).json({ message: 'Terjadi kesalahan saat autentikasi.' });
  }
};

module.exports = authenticate;
