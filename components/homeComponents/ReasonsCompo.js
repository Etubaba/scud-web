import React from "react";

const ReasonsCompo = ({ item, drive }) => {
  return (
    <div
      className={`${
        drive ? "lg:w-56 md:w-60" : "lg:w-72 md:w-[34rem]"
      } space-y-5`}
    >
      <img
        alt="scud"
        className={drive ? "lg:w-24 h-24" : "lg:w-28 h-28 "}
        src={item.image}
      />
      <p className={"text-xl font-semibold "}>{item.subtitle}</p>
      <p
        className={
          drive
            ? "text-lg font-semibold tracking-wide"
            : " text-2xl  tracking-wider"
        }
      >
        {item.title}
      </p>
      <p className={drive ? "text-sm " : "text-base text-justify"}>
        {item.description}
      </p>
    </div>
  );
};

export default ReasonsCompo;
