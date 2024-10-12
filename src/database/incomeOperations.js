import * as SQLite from 'expo-sqlite';

let db;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('budgetApp.db');
  }
  return db;
};

//get income types
export const getIncomeTypes = async () => {
  try {
    const db = await openDatabase();
    const rows = await db.getAllAsync('SELECT * FROM income_type');
    return rows;  // returns an array of income type records
  } catch (error) {
    console.error('Error fetching income types:', error);
  }
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

  export const getIncomes = async () => {
    try {
      const db = await openDatabase();
      const rows = await db.getAllAsync('SELECT * FROM income');
      return rows;  // returns an array of income records
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };