import { useRouter } from "next/router";
import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";

const DashboardCompo = ({ color, Icon, value, title, viewBtn, onClick, filled, link }) => {
  const divColor =
    color === "red"
      ? "border-red-600"
      : color == "green"
      ? "border-green-600"
      : color == "yellow"
      ? "border-yellow-400"
      : "border-scudGreen";
  const divColor2 =
    color === "red"
      ? "bg-red-600"
      : color == "green"
      ? "bg-green-600"
      : color == "yellow"
      ? "bg-yellow-400"
      : color == "indigo"
      ? "bg-indigo-500"
      : color == "emerald"
      ? "bg-emerald-500"
      : "bg-scudGreen";

  const iconColor =
    color === "red"
      ? "bg-red-600"
      : color == "green"
      ? "bg-green-600"
      : color == "yellow"
      ? "bg-yellow-400"
      : "bg-scudGreen";

  const iconColorFilled =
    color === "red"
      ? "text-red-600"
      : color == "green"
      ? "text-green-600"
      : color == "yellow"
      ? "text-yellow-400"
      : color == "indigo"
      ? "text-indigo-500"
      : color == "emerald"
      ? "text-emerald-500"
      : "text-scudGreen";

  const router = useRouter();

  function toPath() {
    if (link !== undefined) return router.push(link);
    return;
  }

  if (filled) {
    return (
      <div
        onClick={toPath}
        className={`shadow ${
          link !== undefined && "cursor-pointer"
        } rounded-md md:h-28 justify-start items-center w-full ${divColor2} flex p-5 space-x-2`}
      >
        <div className={`bg-white p-3 flex justify-center items-center rounded-full text-white`}>
          <Icon className={`text-2xl ${iconColorFilled}`} />
        </div>
        <div>
          <p className="font-semibold text-white text-lg md:text-lg">{value}</p>
          <p className=" text-white md:text-xs">{title}</p>
          {viewBtn && (
            <button
              onClick={onClick}
              className="p-1 mt-1 mb-4 flex rounded-md text-scudGreen text-[10px]  font-semibold  hover:bg-[#dce2f8] "
            >
              View more &nbsp;
              <BsArrowRightCircle className="mt-1" />
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={toPath}
        className={`shadow-lg ${
          link !== undefined && "cursor-pointer"
        } rounded-md h-24 justify-start items-center w-full ${divColor} flex p-5 space-x-2 border`}
      >
        <div
          className={`${iconColor} p-3 flex justify-center items-center rounded-full text-white`}
        >
          <Icon className="text-xl " />
        </div>
        <div>
          <p className="font-semibold text-lg md:text-xl">{value}</p>
          <p className="text-[#9E9FA3] md:text-xs">{title}</p>
          {viewBtn && (
            <button
              onClick={onClick}
              className="p-1 mt-1 mb-4 flex rounded-md text-scudGreen text-[10px]  font-semibold  hover:bg-[#dce2f8] "
            >
              View more &nbsp;
              <BsArrowRightCircle className="mt-1" />
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default DashboardCompo;
