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
        name TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        user_id INTEGER,
        expense_type_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (expense_type_id) REFERENCES expense_type(id)
      );
    `);

    // Create Income table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

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


