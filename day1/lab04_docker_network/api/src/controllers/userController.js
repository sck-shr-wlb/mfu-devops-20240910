import User from '../models/user.js';

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.getById(id);
      res.json(user);
    } catch (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const userId = await User.create(userData);
      res.status(201).json({ message: `User added with ID: ${userId}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      await User.update(id, userData);
      res.json({ message: 'User updated successfully.' });
    } catch (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.delete(id);
      res.json({ message: 'User deleted successfully.' });
    } catch (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  },
};

export default userController;
