import React from "react";
import { getTimeAgo } from "../services/getTimeAgo";

const CountDown = ({ date }) => {
  const [countdown, setCountdown] = useState("");
  const currentDate = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      if (date <= currentDate) {
        setCountdown(date);
        clearInterval(interval);
        return;
      }
      const timeDifference = targetDate.getTime() - currentDate.getTime();
      // Calculate days, hours, minutes, and seconds remaining
      const seconds = Math.floor(timeDifference / 1000) % 60;
      const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
      const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setCountdown(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (date <= currentDate) return <p>{getTimeAgo(data)}</p>;
  return <p>{countdown}</p>;
};

export default CountDown;
