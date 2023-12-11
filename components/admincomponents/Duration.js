import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleEarnings } from "../../features/scudSlice";
import { useState } from "react";

function getWeeksInMonth(year, month) {
  // Ensure month is zero-indexed (January is 0, February is 1, etc.)
  const adjustedMonth = month - 1;

  // Create a new date for the first day of the month
  const firstDayOfMonth = new Date(year, adjustedMonth, 1);

  // Create a new date for the last day of the month
  const lastDayOfMonth = new Date(year, adjustedMonth + 1, 0);

  // Calculate the number of days in the month
  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Calculate the number of weeks by dividing the total days by 7
  const totalWeeks = Math.ceil(totalDaysInMonth / 7);

  return totalWeeks;
}

function getCurrentWeekOfMonth(currentDate) {
  const now = currentDate;
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const daysInMonth = endOfMonth.getDate();
  const daysFromStartOfMonth = Math.ceil((now - startOfMonth) / (1000 * 60 * 60 * 24)) + 1;

  const currentWeek = Math.ceil(daysFromStartOfMonth / 7);
  return currentWeek;
}

const Duration = ({ earning, time, setTime }) => {
  // const [time, setTime] = useState("yearly");

  const EarningState = useSelector((state) => state.scud.earnings);
  const dispatch = useDispatch();
  const date = new Date();
  const WeeksInMonth = getWeeksInMonth(date.getFullYear(), date.getMonth() + 1);
  // const { earnings, net_earnings } = earning;
  const [dailyearnings, setDailyEarnings] = useState([]);
  const [weeklyearnings, setWeeklyEarnings] = useState([]);
  const [monthlyearnings, setMonthlyEarnings] = useState([]);
  const [yearlyearnings, setYearlyEarnings] = useState([]);
  // console.log(earnings);

  const categories = {
    daily: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekly: ["wk-1", "wk-2", "wk-3", "wk-4", "wk-5"],
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "JulL", "Aug", "Sep", "Oct", "Nov", "Dec"],
    yearly: [
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
      "2033",
      "2034",
      "2035",
      "2037",
      "2038",
      "2039",
      "2040"
    ]
  };
  // useEffect(() => {
  //   for (let index = 1; index <= WeeksInMonth; index++) {
  //     categories.weekly.push(`wk-${index}`);
  //   }
  // }, []);

  function handleDailyEarnings() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = getCurrentWeekOfMonth(currentDate);

    const MondayEarning = [];
    const TuesdayEarning = [];
    const WednesdayEarning = [];
    const ThursdayEarning = [];
    const FridayEarning = [];
    const SaturdayEarning = [];
    const SundayEarning = [];

    earning?.earnings.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.getMonth() == currentMonth ? entryDate.getMonth() : null;

      const entryCrntWeek = getCurrentWeekOfMonth(entryDate);
      // console.log(entry);
      console.log(entryMonth);

      if (entryCrntWeek === currentWeek && entryMonth === currentMonth) {
        // console.log(entryDate.getDay());
        if (entryDate.getDay() == 0) {
          SundayEarning.push(entry.amount);
        } else if (entryDate.getDay() == 1) {
          MondayEarning.push(entry.amount);
        } else if (entryDate.getDay() == 2) {
          TuesdayEarning.push(entry.amount);
        } else if (entryDate.getDay() == 3) {
          WednesdayEarning.push(entry.amount);
        } else if (entryDate.getDay() == 4) {
          ThursdayEarning.push(entry.amount);
        } else if (entryDate.getDay() == 5) {
          FridayEarning.push(entry.amount);
          // console.log(entry.amount, "here");
        } else {
          SaturdayEarning.push(entry.amount);
        }
      }
    });

    const firstDay =
      MondayEarning.length == 0 && currentDate.getDay() >= 1
        ? 0
        : MondayEarning.length == 0
        ? null
        : currentDate.getDay() >= 1
        ? MondayEarning.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          })
        : null;

    const secondDay =
      TuesdayEarning.length == 0 && currentDate.getDay() >= 2
        ? 0
        : TuesdayEarning.length == 0
        ? null
        : currentDate.getDay() >= 2
        ? TuesdayEarning.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          })
        : null;

    const thirdDay =
      WednesdayEarning.length == 0 && currentDate.getDay() >= 3
        ? 0
        : WednesdayEarning.length == 0
        ? null
        : currentDate.getDay() >= 3
        ? WednesdayEarning.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          })
        : null;
    const fourthDay =
      ThursdayEarning.length == 0 && currentDate.getDay() >= 4
        ? 0
        : ThursdayEarning.length == 0
        ? null
        : currentDate.getDay() >= 4
        ? ThursdayEarning.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          })
        : null;
    const fifth =
      FridayEarning.length == 0 && currentDate.getDay() >= 5
        ? 0
        : FridayEarning.length == 0
        ? null
        : currentDate.getDay() >= 5
        ? FridayEarning.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          })
        : null;
    const sixth =
      SaturdayEarning.length == 0 && currentDate.getDay() >= 6
        ? 0
        : SaturdayEarning.length == 0
        ? null
        : currentDate.getDay() >= 6
        ? SaturdayEarning.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          })
        : null;

    const seventh =
      SundayEarning.length == 0 && currentDate.getDay() >= 0
        ? 0
        : SundayEarning.length == 0
        ? null
        : currentDate.getDay() >= 0
        ? SundayEarning.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          })
        : null;

    setDailyEarnings([seventh, firstDay, secondDay, thirdDay, fourthDay, fifth, sixth]);
  }

  function handleWeeklyEarnings() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = getCurrentWeekOfMonth(currentDate);

    const earningsByWeek1 = [];
    const earningsByWeek2 = [];
    const earningsByWeek3 = [];
    const earningsByWeek4 = [];
    const earningsByWeek5 = [];

    earning?.earnings.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth() == currentMonth ? entryDate.getMonth() : null;
      const entryDateNum = entryDate.getMonth() == currentMonth ? entryDate.getDate() : null;
      if (entryYear === currentYear && entryMonth === currentMonth) {
        if (entryDateNum <= 7) {
          earningsByWeek1.push(entry.amount);
        } else if (entryDateNum <= 14) {
          earningsByWeek2.push(entry.amount);
        } else if (entryDateNum <= 22) {
          earningsByWeek3.push(entry.amount);
        } else if (entryDateNum <= 29) {
          earningsByWeek4.push(entry.amount);
        } else {
          earningsByWeek5.push(entry.amount);
        }
      }
    });

    const wk1sum =
      earningsByWeek1.length == 0
        ? 0
        : earningsByWeek1.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          });
    const wk2sum =
      earningsByWeek2.length == 0
        ? 0
        : earningsByWeek2.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          });
    const wk3sum =
      earningsByWeek3.length == 0
        ? 0
        : earningsByWeek3.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          });
    const wk4sum =
      earningsByWeek4.length == 0
        ? 0
        : earningsByWeek4.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          });
    const wk5sum =
      earningsByWeek5.length == 0
        ? 0
        : earningsByWeek5.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          });

    setWeeklyEarnings([wk1sum, wk2sum, wk3sum, wk4sum, wk5sum]);
  }

  function handleMonthlyEarnings() {
    const currentYear = new Date().getFullYear();
    const earningsByMonth = {};
    const currentMonth = new Date().getMonth();

    earning?.earnings.forEach((entry) => {
      const entryYear = new Date(entry.date).getFullYear();
      const entryMonth = new Date(entry.date).getMonth();

      if (entryYear === currentYear) {
        const monthKey = entryMonth; // Month index (0 for January, 1 for February, etc.)
        if (!earningsByMonth[monthKey]) {
          earningsByMonth[monthKey] = 0;
        }
        earningsByMonth[monthKey] += entry.amount;
      }
    });

    for (let month = 0; month <= currentMonth; month++) {
      if (!earningsByMonth[month]) {
        earningsByMonth[month] = 0;
      }
    }

    const totalEarningsByMonth = Object.keys(earningsByMonth).map(
      (monthKey) => earningsByMonth[monthKey]
    );

    setMonthlyEarnings(totalEarningsByMonth);
    // console.log(totalEarningsByMonth);
  }

  function handleYearlyEarnings() {
    const earningsByYear = {};

    earning?.earnings.forEach((entry) => {
      const year = new Date(entry.date).getFullYear();
      if (!earningsByYear[year]) {
        earningsByYear[year] = 0;
      }

      // console.log(earningsByYear[year]);
      earningsByYear[year] += entry.amount;
    });
    // console.log(earningsByYear);

    const totalEarningsByYear = Object.keys(earningsByYear).map((year) => earningsByYear[year]);

    setYearlyEarnings([0, ...totalEarningsByYear]);
  }

  // console.log(earnings);

  useEffect(() => {
    handleDailyEarnings();
    handleWeeklyEarnings();
    handleMonthlyEarnings();
    handleYearlyEarnings();
  }, [earning]);

  useEffect(() => {
    dispatch(handleEarnings({ time: "daily", category: categories.daily, data: dailyearnings }));
  }, [dailyearnings]);

  const handleDaily = () => {
    setTime("daily");
    dispatch(handleEarnings({ time: "daily", category: categories.daily, data: dailyearnings }));
  };

  const handleWeekly = () => {
    setTime("weekly");
    dispatch(handleEarnings({ time: "weekly", category: categories.weekly, data: weeklyearnings }));
  };

  const handleMonthly = () => {
    setTime("monthly");
    dispatch(
      handleEarnings({ time: "monthly", category: categories.monthly, data: monthlyearnings })
    );
  };

  const handleYearly = () => {
    setTime("yearly");
    dispatch(handleEarnings({ time: "yearly", category: categories.yearly, data: yearlyearnings }));
  };

  return (
    <div className="flex   border px-4 py-1.5 md:justify-center justify-end    items-center   rounded-xl space-x-5">
      <span
        onClick={handleDaily}
        className={
          EarningState.time && time === "daily"
            ? "text-white bg-scudGreen rounded-md px-2 py-1 text-xs "
            : " text-textColor/50 cursor-pointer text-sm"
        }
      >
        Daily
      </span>
      <span
        onClick={handleWeekly}
        className={
          EarningState.time && time === "weekly"
            ? "text-white bg-scudGreen rounded-md px-2 py-1 text-xs "
            : " text-textColor/50 cursor-pointer text-sm"
        }
      >
        Weekly
      </span>
      <span
        onClick={handleMonthly}
        className={
          EarningState.time && time === "monthly"
            ? "text-white bg-scudGreen rounded-md px-2 py-1 text-xs "
            : " text-textColor/50 cursor-pointer text-sm"
        }
      >
        Monthly
      </span>
      <span
        onClick={handleYearly}
        className={
          EarningState.time && time === "yearly"
            ? "text-white bg-scudGreen rounded-md px-2 py-1 text-xs "
            : " text-textColor/50 cursor-pointer text-sm"
        }
      >
        Yearly
      </span>
    </div>
  );
};

export default Duration;
