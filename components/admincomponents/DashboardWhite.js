import React from "react";

const DashboardWhite = ({ title, value, style }) => {
  return (
    <div className="px-4 py-4 bg-white border w-full rounded-lg">
      <p className="text-textColor/50 text-sm mb-3">{title}</p>
      <p
        className={
          style === undefined
            ? "text-textColor font-semibold text-2xl"
            : `text-textColor font-semibold ${style}`
        }
      >
        {value}
      </p>
    </div>
  );
};

export default DashboardWhite;
