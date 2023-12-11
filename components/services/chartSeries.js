export function chartSeries(data, period) {
  const counts = [];

  if (period === "monthly") {
    for (let i = 0; i < 12; i++) {
      counts.push(0);
    }

    data.forEach((obj) => {
      const date = new Date(obj.created_at);
      counts[date.getMonth()]++;
    });
  }

  if (period === "daily") {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const endOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (6 - now.getDay())
    );
    const daysInWeek = Math.ceil(
      (endOfWeek.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24)
    );

    for (let i = 0; i < daysInWeek; i++) {
      counts.push(0);
    }

    data.forEach((obj) => {
      const date = new Date(obj.created_at);

      if (date >= startOfWeek && date <= endOfWeek) {
        const dayOfWeek = date.getDay();
        const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        counts[dayIndex]++;
      }
    });
  }

  if (period === "yearly") {
    const startYear = 2023;
    const endYear = 2032;

    for (let i = startYear; i <= endYear; i++) {
      counts.push(0);
    }

    data.forEach((obj) => {
      const date = new Date(obj.created_at);
      const year = date.getFullYear();

      if (year >= startYear && year <= endYear) {
        counts[year - startYear]++;
      }
    });
  }

  if (period === "weekly") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startOfWeek = new Date(startOfMonth);
    const endOfWeek = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate() + 6
    );
    let weekIndex = 0;

    while (startOfWeek <= endOfMonth) {
      counts.push(0);

      data.forEach((obj) => {
        const date = new Date(obj.created_at);

        if (date >= startOfWeek && date <= endOfWeek) {
          counts[weekIndex]++;
        }
      });

      startOfWeek.setDate(startOfWeek.getDate() + 7);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      weekIndex++;
    }
  }

  return counts;
}
