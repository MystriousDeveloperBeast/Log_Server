export function parseLog(logText: string) {
  const regex = /\[(.*?)\] \[VEHICLE_ID:(\d+)\] \[ERROR\] \[CODE:(.*?)\] \[(.*?)\]/;
  const match = logText.match(regex);
  if (!match) return [];

  return [{
    timestamp: match[1],
    vehicleId: match[2],
    code: match[3],
    message: match[4],
  }];
}