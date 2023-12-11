import React from "react";
import { isDateToday } from "../services/isDateToday";
import { getTimeAgo } from "../services/getTimeAgo";

function ChatWidget({
  item: { id, first_name, last_name, unread_messages, picture, last_message },
  onClick
}) {
  const status = "online";
  const active = false;
  // const { created_at, content } = last_message;
  return (
    <div
      onClick={onClick}
      key={id}
      className={
        active
          ? "border hover:border hover:shadow-lg rounded-md flex space-x-3  shadow-md cursor-pointer  p-2"
          : " flex hover:border hover:shadow-lg rounded-md p-2 space-x-3 cursor-pointer "
      }
    >
      <div className="relative block">
        <img src={picture} alt="" loading="lazy" className="rounded-full object-cover  h-[32px] w-[35px]" />
        <div
          className={
            status === "online"
              ? "h-2 w-2 absolute top-6  right-[2%] rounded-full bg-green-500"
              : "h-2 w-2 absolute top-6 right-[2%]  rounded-full bg-slate-300"
          }
        ></div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-sm font-semibold">{first_name + " " + last_name}</p>
          {last_message !== null && (
            <p className="text-textColor/50 text-xs">
              {isDateToday(last_message?.created_at)
                ? getTimeAgo(last_message?.created_at)
                : new Date(last_message?.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex  justify-between items-center w-full">
          {last_message === null ? (
            <p className="text-xs text-textColor/50 mt-1"> </p>
          ) : (
            <p className="text-xs text-textColor/50 mt-1">
              {last_message?.content.substring(0, 40) + "..."}
            </p>
          )}
          {unread_messages > 0 && (
            <span className="text-white bg-scudGreen h-3 w-3 flex justify-center items-center text-[7px] rounded-full p-1 ">
              {unread_messages}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
