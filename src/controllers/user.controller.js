const userService = require('../services/user.service');

exports.myProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await userService.getMe(userId);
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan '});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};