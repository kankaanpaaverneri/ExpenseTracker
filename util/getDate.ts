export interface ParsedDate {
  day: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getDate(): ParsedDate {
  const date = new Date();
  const parsedDate = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
  return parsedDate;
}

export function formatDate(date: Date): ParsedDate {
  const formatedDate = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
  return formatedDate;
}
