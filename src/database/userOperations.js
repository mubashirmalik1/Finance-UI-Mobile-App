import * as SQLite from 'expo-sqlite';

let db;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('budgetApp.db');
  }
  return db;
};

// Add a new user
export const addUser = async (name, image, email, password) => {
  try {
    const db = await openDatabase();
    const result = await db.runAsync(
      'INSERT INTO User (name, image, email, password) VALUES (?, ?, ?, ?)',
      name, image, email, password
    );
    return result;
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const db = await openDatabase();
    const rows = await db.getAllAsync('SELECT * FROM User');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Update a user
export const updateUser = async (id, name, image, email, password) => {
  try {
    const db = await openDatabase();
    await db.runAsync(
      'UPDATE User SET name = ?, image = ?, email = ?, password = ? WHERE id = ?',
      [name, image, email, password, id]
    );
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const db = await openDatabase();
    await db.runAsync('DELETE FROM User WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// Get a single user by ID
export const getUserById = async (id) => {
  try {
    const db = await openDatabase();
    const row = await db.getFirstAsync('SELECT * FROM User WHERE id = ?', [id]);
    return row;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
