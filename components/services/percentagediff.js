import { isDateToday } from "./isDateToday";

export function percentageDiff(arr) {
  const check = Array.isArray(arr);
  if (!check) return 0;
  const todaysEarning = arr
    .filter((x) => isDateToday(x.date))
    .reduce((acc, item) => {
      return item.amount + acc;
    }, 0);
  const yesterdaysEarning = arr
    .filter((x) => isYesterday(x.date))
    .reduce((acc, item) => {
      return item.amount + acc;
    }, 0);

  if (yesterdaysEarning === 0 && todaysEarning > 0) return `100%`;
  if (yesterdaysEarning === 0 && todaysEarning === 0) return `0%`;
  //calculate the percentage difference
  const ans = ((todaysEarning - yesterdaysEarning) / yesterdaysEarning) * 100;
  return `${Math.ceil(ans)}%`;
}

function isYesterday(dateString) {
  const today = new Date();
  const inputDate = new Date(dateString);
  if (isNaN(inputDate)) return false;
  return (
    today.getFullYear() === inputDate.getFullYear() &&
    today.getMonth() === inputDate.getMonth() &&
    today.getDay() - 1 === inputDate.getDay()
  );
}
