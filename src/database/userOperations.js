import * as SQLite from 'expo-sqlite';

let db;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('budgetApp.db');
  }
  return db;
};

// Add a new user
export const addUser = async (name, image, email) => {
  try {
    const password = 'password';
    const db = await openDatabase();
    const result = await db.runAsync(
      'INSERT INTO users (name, image, email,password) VALUES (?, ?, ?, ?)',
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
export const updateUser = async (id = 1, name, image, email) => {
  try {
    const db = await openDatabase();
    //check if the user exists
    const user = await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
      user = await addUser(name, image, email);
    }
    
    await db.runAsync(
      'UPDATE users SET name = ?, image = ?, email = ? WHERE id = ?',
      [name, image, email, id]
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
    const row = await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [id]);
    return row;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
