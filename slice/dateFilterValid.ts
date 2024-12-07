function areNumbers(substring: string): boolean {
  for (const character of substring) {
    const isNotANumber = Number.isNaN(Number(character));
    if (isNotANumber) return false;
  }
  return true;
}

function isValidRange(number: number, min: number, max: number): boolean {
  if (number >= min && number <= max) {
    return true;
  }
  return false;
}

function isLeapYear(year: number) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      return year % 400 === 0;
    }
    return true;
  }

  return false;
}

function maxDaysInMonth(month: number, year: number): number {
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30Days = [4, 6, 9, 11];
  const februaryMonthNumber: number = isLeapYear(year) ? 29 : 28;
  let maximumDaysInMonth: number = februaryMonthNumber;
  monthsWith31Days.forEach((monthNumber) => {
    if (monthNumber === month) {
      maximumDaysInMonth = 31;
    }
  });

  monthsWith30Days.forEach((monthNumber) => {
    if (monthNumber === month) {
      maximumDaysInMonth = 30;
    }
  });

  return maximumDaysInMonth;
}

export function dateFilterValid(dateFilter: string): boolean {
  if (dateFilter.length === 0) {
    return true;
  }
  const [day, month, year] = dateFilter.split(".");

  if (!day || !month || !year) {
    return false;
  }

  if (!areNumbers(day) || !areNumbers(month) || !areNumbers(year)) {
    return false;
  }

  if (day.length < 1 && day.length > 2) {
    return false;
  }

  if (month.length < 1 && month.length > 2) {
    return false;
  }

  if (year.length !== 4) {
    return false;
  }

  if (!isValidRange(Number(month), 1, 12)) {
    return false;
  }

  if (
    !isValidRange(Number(day), 1, maxDaysInMonth(Number(month), Number(year)))
  ) {
    return false;
  }

  return true;
}
