export function todaysEarningsSeries(arr) {
  const category = ["4th", "8th", "12th", "16th", "20th", "24th"];
  const series = category.map((el) => filterByHour(arr, el));
  return series;
}

function filterByHour(arr, target) {
  const hourRanges = {
    "4th": [0, 4],
    "8th": [4, 8],
    "12th": [8, 12],
    "16th": [12, 16],
    "20th": [16, 20],
    "24th": [20, 24]
  };
  const [startHour, endHour] = hourRanges[target] || [0, 0];
  const filterData = arr.filter((x) => {
    const hour = new Date(x.date).getHours();
    return hour > startHour && hour <= endHour;
  });

  return filterData.reduce((acc, item) => acc + item.amount, 0);
}
