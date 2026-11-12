// Turns a stored ISO date string into the local "YYYY-MM-DDTHH:mm" value
// that a datetime-local input expects. Returns "" for missing or bad values.
export function toInputDateValue(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}
