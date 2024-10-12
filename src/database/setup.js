import * as SQLite from 'expo-sqlite';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const defaultExpenseTypes = [
  'Food & Dining',
  'Transportation',
  'Housing & Utilities',
  'Insurance',
  'Healthcare',
  'Entertainment',
  'Clothing',
  'Debt Payments',
  'Gifts & Donations',
  'Education',
  'Travel',
  'Savings & Investments',
  'Personal Care',
  'Miscellaneous',
];

export const setupDatabase = async () => {
  try {
    // Open the database
    const db = await SQLite.openDatabaseAsync('budgetApp.db');

    // Enable write-ahead logging
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

//override the use stict mode
// Drop tables if they exist
// await db.execAsync(`DROP TABLE IF EXISTS users;`);
// await db.execAsync(`DROP TABLE IF EXISTS expense_type;`);
// await db.execAsync(`DROP TABLE IF EXISTS spending;`);
// await db.execAsync(`DROP TABLE IF EXISTS income;`);
// await db.execAsync(`DROP TABLE IF EXISTS income_type;`);

//make income table empty
    // Create User table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // Create Expense Type table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS expense_type (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      );
    `);

    // Create Spending table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS spending (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        user_id INTEGER,
        expense_type_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (expense_type_id) REFERENCES expense_type(id)
      );
    `);
    // Create Income Type table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS income_type (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      );
    `);

    // Create Income table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS income (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      income_type_id INTEGER NOT NULL,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (income_type_id) REFERENCES income_type(id)
      );
    `);

    // add default income types
    const defaultIncomeTypes = [
      'Salary',
      'Investment',
      'Gift',
      'Interest',
      'Rental',
      'Freelance',
      'Other',
    ];
    for (const type of defaultIncomeTypes) {
      await db.runAsync(
        'INSERT OR IGNORE INTO income_type (name) VALUES (?);',
        type
      );
    }
    // Seed default expense types if not present
    for (const type of defaultExpenseTypes) {
      await db.runAsync(
        'INSERT OR IGNORE INTO expense_type (name) VALUES (?);',
        type
      );
    }
    console.log('Database setup complete.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
  finally{

  }
};


