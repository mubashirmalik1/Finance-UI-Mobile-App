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
       SELECT income_type.id, income_type.name as type, IFNULL(SUM(income.amount), 0) as total_amount
      FROM income_type
      LEFT JOIN income 
        ON income_type.id = income.income_type_id 
        AND strftime('%m', income.date) = strftime('%m', 'now') 
        AND strftime('%Y', income.date) = strftime('%Y', 'now')
      GROUP BY income_type.id, income_type.name
    `);

    return rows;
   
  } catch (error) {
    console.error('Error fetching income:', error);
  }
}

export const deleteAllIncome = async () => {
  try {
    const db = await openDatabase();
    await db.runAsync('DELETE FROM income');
  } catch (error) {
    console.error('Error deleting all income:', error);
  }
}

export const getAllIncomes = async (userId = 1, date = null) => {
  try {
    const db = await openDatabase();
    let rows = [];
    if (date) {
      rows = await db.getAllAsync('SELECT * FROM income WHERE date = ?', [ date]);
    } else {
      rows = await db.getAllAsync('SELECT * FROM income',);
    }
    return rows;
  } catch (error) {
    console.error('Error fetching income:', error);
  }
}
