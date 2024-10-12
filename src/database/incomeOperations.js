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
        'INSERT INTO income (name, amount, date, income_type_id, user_id) VALUES (?, ?, ?, ?, ?)',
        [name, amount, date, incomeType, userId]
      );
      return result;
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

export const getIncomeTypeWithPrice = async (userId = 1) => {
  try {
    const db = await openDatabase();
    //get income Type and create left join with income table
    const rows = await db.getAllAsync(`
      SELECT income.id, income.name, income.amount, income.date, income_type.name AS type
      FROM income
      LEFT JOIN income_type ON income.income_type_id = income_type.id
      WHERE income.user_id = ?
    `, [userId]);

  
   
  } catch (error) {
    console.error('Error fetching income:', error);
  }
}
