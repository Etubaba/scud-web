export function getYearsArray(year) {
  const currentYear = new Date().getFullYear();
  const startYear = parseInt(year, 10);

  if (isNaN(startYear) || startYear > currentYear) {
    return [];
  }

  const yearsArray = [];

  for (let i = startYear; i <= currentYear; i++) {
    yearsArray.push(i.toString());
  }

  return yearsArray.reverse();
}
