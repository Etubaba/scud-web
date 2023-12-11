export function isDateToday(dateString) {
  const today = new Date();
  const inputDate = new Date(dateString);

  // Check if the inputDate is a valid Date object
  if (isNaN(inputDate)) return false;

  // Compare year, month, and day of today and the inputDate
  return (
    today.getFullYear() === inputDate.getFullYear() &&
    today.getMonth() === inputDate.getMonth() &&
    today.getDate() === inputDate.getDate()
  );
}
