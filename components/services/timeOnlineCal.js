export function timeOnlineCalculation(data, interval) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentWeek = getWeekNumber(currentDate);

  if (interval === "daily") {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const weeklyValues = [0, 0, 0, 0, 0, 0, 0];

    data.forEach((item) => {
      const itemDate = new Date(item.created_at);
      const itemDayOfWeek = itemDate.getDay();
      const itemTime = Math.abs(item.time);

      if (itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth) {
        weeklyValues[itemDayOfWeek] += itemTime;
      }
    });

    return weeklyValues;
  }

  if (interval === "monthly") {
    const monthlyValues = Array(12).fill(0);

    data.forEach((item) => {
      const itemDate = new Date(item.created_at);
      const itemMonth = itemDate.getMonth();
      const itemTime = Math.abs(item.time);

      if (itemDate.getFullYear() === currentYear) {
        monthlyValues[itemMonth] += itemTime;
      }
    });

    return monthlyValues;
  }

  if (interval === "weekly") {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const numWeeksInMonth = getWeekNumber(lastDayOfMonth) - getWeekNumber(firstDayOfMonth) + 1;
    const weeklyValues = Array(numWeeksInMonth).fill(0);

    data.forEach((item) => {
      const itemDate = new Date(item.created_at);
      const itemWeek = getWeekNumber(itemDate);
      const itemTime = Math.abs(item.time);

      if (itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth) {
        weeklyValues[itemWeek - getWeekNumber(firstDayOfMonth)] += itemTime;
      }
    });

    return weeklyValues;
  }

  // If the interval is not recognized, return an empty array
  return [];
}

// Helper function to get the week number of a date
function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
}

// Helper function to get the number of weeks in a month
function getWeeksInMonth(year, month) {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastWeekOfMonth = getWeekNumber(lastDayOfMonth);
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekOfMonth = getWeekNumber(firstDayOfMonth);

  return lastWeekOfMonth - firstWeekOfMonth + 1;
}
