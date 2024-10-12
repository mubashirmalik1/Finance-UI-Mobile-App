import * as SQLite from 'expo-sqlite';

let db;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('budgetApp.db');
  }
  return db;
};

// Add a new user
export const addExpenseType = async (name) => {
    try {
      const db = await openDatabase();
      const result = await db.runAsync(
        'INSERT INTO expense_type (name) VALUES (?)',
        [name]
      );
      return result;
    } catch (error) {
      // Check if the error is due to the unique constraint
      if (error.message.includes('UNIQUE constraint failed')) {
        console.error(`Expense type with name "${name}" already exists.`);
      } else {
        console.error('Error adding expense type:', error);
      }
    }
  };

// Get expense type by id
export const getExpenseTypeById = async (id) => {
    try {
      const db = await openDatabase();
      const row = await db.getFirstAsync('SELECT * FROM expense_type WHERE id = ?', [id]);
      return row;
    } catch (error) {
      console.error('Error fetching expense type by ID:', error);
    }
  };

// Update a user
export const updateExpenseType = async (id, name) => {
    try {
      const db = await openDatabase();
  
      // Check if the name already exists for a different expense_type
      const existing = await db.getFirstAsync(
        'SELECT * FROM expense_type WHERE name = ? AND id != ?',
        [name, id]
      );
  
      if (existing) {
        console.error(`Expense type with name "${name}" already exists.`);
        return { error: 'Expense type with this name already exists.' };
      }
  
      // Proceed with the update if the name is unique
      await db.runAsync(
        'UPDATE expense_type SET name = ? WHERE id = ?',
        [name, id]
      );
  
      return { success: true };
    } catch (error) {
      console.error('Error updating expense type:', error);
      return { error: 'Error updating expense type.' };
    }
  };
  

// Delete a expense
export const deleteExpenseType = async (id) => {
    try {
      const db = await openDatabase();
      await db.runAsync('DELETE FROM expense_type WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting expense type:', error);
    }
  };

// Get all expense types
export const getExpenseTypes = async () => {
    try {
      const db = await openDatabase();
      const rows = await db.getAllAsync('SELECT * FROM expense_type');
      return rows;
    } catch (error) {
      console.error('Error fetching expense types:', error);
    }
  };

export const addExpense = async ( amount, date, expenseType, userId = 1) => {
    try {
      const db = await openDatabase();
      const result = await db.runAsync(
        'INSERT INTO spending ( amount, date, expense_type_id, user_id) VALUES ( ?, ?, ?, ?)',
        [ amount, date, expenseType, userId]
      );
      return result;
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  }
