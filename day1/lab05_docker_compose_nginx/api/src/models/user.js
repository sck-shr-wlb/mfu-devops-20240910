import db from '../config/db.js';

const User = {
  getAll: async () => {
    try {
      const [results] = await db.query('SELECT * FROM users');
      return results;
    } catch (err) {
      throw new Error('Error fetching users: ' + err.message);
    }
  },

  getById: async (id) => {
    try {
      const [results] = await db.query('SELECT * FROM users WHERE id = ?', [
        id,
      ]);
      if (results.length === 0) {
        throw new Error('User not found');
      }
      return results[0];
    } catch (err) {
      throw new Error('Error fetching user: ' + err.message);
    }
  },

  create: async (userData) => {
    try {
      const { name, email } = userData;
      const [results] = await db.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      return results.insertId;
    } catch (err) {
      throw new Error('Error creating user: ' + err.message);
    }
  },

  update: async (id, userData) => {
    try {
      const { name, email } = userData;
      const [results] = await db.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
      if (results.affectedRows === 0) {
        throw new Error('User not found');
      }
      return results;
    } catch (err) {
      throw new Error('Error updating user: ' + err.message);
    }
  },

  delete: async (id) => {
    try {
      const [results] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      if (results.affectedRows === 0) {
        throw new Error('User not found');
      }
      return results;
    } catch (err) {
      throw new Error('Error deleting user: ' + err.message);
    }
  },
};

export default User;
