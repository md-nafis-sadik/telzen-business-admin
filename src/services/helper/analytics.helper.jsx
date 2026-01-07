import moment from 'moment';

export function generateMonthlyData(existingData) {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;
  const previousMonth = moment().subtract(1, "months").month() + 1;
  const previousYear = moment().subtract(1, "months").year();
  let totalCurrentMonth = 0;
  let totalPreviousMonth = 0;
  const formattedData = [];

  for (let day = 1; day <= 31; day++) {
    const currentDateStr = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    const previousDateStr = `${previousYear}-${String(previousMonth).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    const currentEntry = existingData.find(
      (item) => item.date === currentDateStr
    );
    const previousEntry = existingData.find(
      (item) => item.date === previousDateStr
    );

    const currentAmount = currentEntry ? currentEntry.total : 0;
    const previousAmount = previousEntry ? previousEntry.total : 0;

    totalCurrentMonth += currentAmount;
    totalPreviousMonth += previousAmount;

    formattedData.push({
      name: String(day).padStart(2, "0"),
      Previous: previousAmount,
      Current: currentAmount,
    });
  }
  return {
    data: formattedData,
    currentMonthAmount: totalCurrentMonth,
    previousMonthAmount: totalPreviousMonth,
  };
}

export function generateYearlyData(existingData) {
  const currentYear = moment().year();
  const previousYear = moment().subtract(1, "years").year();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let totalCurrentYear = 0;
  let totalPreviousYear = 0;
  const formattedData = [];

  for (let month = 1; month <= 12; month++) {
    const currentMonthStr = `${currentYear}-${String(month).padStart(2, "0")}`;
    const previousMonthStr = `${previousYear}-${String(month).padStart(
      2,
      "0"
    )}`;

    const currentTotal = existingData
      .filter((item) => item.date.startsWith(currentMonthStr))
      .reduce((sum, item) => sum + item.total, 0);
    const previousTotal = existingData
      .filter((item) => item.date.startsWith(previousMonthStr))
      .reduce((sum, item) => sum + item.total, 0);

    totalCurrentYear += currentTotal;
    totalPreviousYear += previousTotal;

    formattedData.push({
      name: months[month - 1],
      Previous: previousTotal,
      Current: currentTotal,
    });
  }
  return {
    data: formattedData,
    currentYearAmount: totalCurrentYear,
    previousYearAmount: totalPreviousYear,
  };
}