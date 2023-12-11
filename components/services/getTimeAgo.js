export const getTimeAgo = (dateString) => {
  if (dateString === null || dateString === undefined) return "N/A";
  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const seconds = timeDiff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30.44; // Average number of days in a month
  const years = days / 365.25; // Average number of days in a year

  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else if (days < 7) {
    return `${Math.floor(days)} days ago`;
  } else if (weeks < 4) {
    return `${Math.floor(weeks)} weeks ago`;
  } else if (months < 12) {
    return `${Math.floor(months)} months ago`;
  } else {
    return `${Math.floor(years)} years ago`;
  }
};
