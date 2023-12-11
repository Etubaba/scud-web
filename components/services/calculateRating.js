export const calculateRating = (rating) => {
  if (rating === null || rating === undefined) return 0;
  const sumRating = rating.reduce((a, b) => {
    return b.rating + a;
  }, 0);
  return Math.ceil(sumRating / rating.length);
};
