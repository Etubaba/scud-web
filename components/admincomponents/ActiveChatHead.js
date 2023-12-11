import React from "react";

function ActiveChatHead({ avatar, name, status, statusText, typing }) {
  return (
    <div className="flex mt-2 md:space-x-2">
      <div className="mr-2 md:mr-0 relative">
        <img src={avatar} alt="" loading="lazy" className="rounded-full md:h-10 md:w-10 h-8 w-8 " />
        <div
          className={
            status === "online"
              ? "h-2 w-2 absolute top-6 mt-1  right-[0.5%] rounded-full bg-green-500"
              : "h-2 w-2 absolute top-6 right-[0.5%]  rounded-full bg-slate-300"
          }
        ></div>
      </div>
      <div className="">
        <p className="text-sm font-semibold">{name}</p>
        {typing ? (
          <i className="text-xs text-textColor/50 md:mt-1">typing...</i>
        ) : (
          <p className="text-xs text-textColor/50 md:mt-1 mb-0.5 md:mb-0">{status}</p>
        )}
      </div>
    </div>
  );
}

export default ActiveChatHead;
