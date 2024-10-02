const User = require('../models/User');

exports.addRoleToUser = async (req, res) => {
    const { userId, role } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.role.includes(role)) {
            user.role.push(role); 
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: 'Role already assigned' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding role', error });
    }
};

exports.updateUserRole = async (req, res) => {
    const { userId, role } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = [role]; 
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error });
    }
};

exports.removeRoleFromUser = async (req, res) => {
    const { userId, role } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = user.role.filter(r => r !== role); 
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error removing role', error });
    }
};
