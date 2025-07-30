import { Request, Response } from 'express';
import { insertLog, queryLogs } from '../services/log.service';

export async function getLogs(req: Request, res: Response) {
  const logs = await queryLogs(req.query);
  res.json(logs);
}

export async function uploadLogFile(req: Request, res: Response) {
  const fs = require('fs');
  const path = './diagnostic-sample.log';
  const lines = fs.readFileSync(path, 'utf-8').split('\n');

  for (const line of lines) {
    const match = line.match(/\[(.*?)\] \[VEHICLE_ID:(\d+)\] \[ERROR\] \[CODE:(.*?)\] \[(.*?)\]/);
    if (match) {
      await insertLog({
        timestamp: match[1],
        vehicle_id: match[2],
        code: match[3],
        message: match[4]
      });
    }
  }
  res.send('Logs uploaded');
}
