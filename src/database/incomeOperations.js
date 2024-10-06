import * as SQLite from 'expo-sqlite';

let db;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('budgetApp.db');
  }
  return db;
};


export const addIncome = async (name, amount, date, incomeType, userId = 1) => {
    try {
      const db = await openDatabase();
      const result = await db.runAsync(
        'INSERT INTO income (name, amount, date, income_type, user_id) VALUES (?, ?, ?, ?, ?)',
        [name, amount, date, incomeType, userId]
      );
      return result;
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };