import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

(async () => {
  const db = await open({
    filename: path.resolve(__dirname, '../../diagnostics.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicle_id TEXT,
      code TEXT,
      message TEXT,
      timestamp TEXT
    );
  `);

  (global as any).db = db;
})();