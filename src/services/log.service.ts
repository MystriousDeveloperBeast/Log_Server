import { LogEntry } from '../models/log.model';

export async function insertLog(log: LogEntry) {
  const db = (global as any).db;
  await db.run(
    'INSERT INTO logs (vehicle_id, code, message, timestamp) VALUES (?, ?, ?, ?)',
    [log.vehicle_id, log.code, log.message, log.timestamp]
  );
}

export async function queryLogs(params: any): Promise<LogEntry[]> {
  const db = (global as any).db;
  const { vehicle, code, from, to } = params;

  let query = 'SELECT * FROM logs WHERE 1=1';
  const args: any[] = [];

  if (vehicle) {
    query += ' AND vehicle_id = ?';
    args.push(vehicle);
  }
  if (code) {
    query += ' AND code = ?';
    args.push(code);
  }
  if (from && to) {
    query += ' AND timestamp BETWEEN ? AND ?';
    args.push(from, to);
  }

  return await db.all(query, args);
}