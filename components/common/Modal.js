import React from "react";
import "animate.css";
import { IoMdClose } from "react-icons/io";

function Modal({ children, onClose, open, title, congrat, notification, removeClose }) {
  // if (typeof window !== "undefined") {
  //   window.onclick = (e) => {
  //     e.target.className === "con";
  //     onClose();
  //   };
  // }

  if (notification) {
    return (
      <>
        {open && (
          <div
            onClick={onClose}
            className="fixed z-50  left-0  bg-black/30 right-0 bottom-0    w-full h-screen flex justify-end items-end"
          >
            <div className="bg-white h-[90vh]  shadow-sm rounded-lg mt-3 animate__animated animate__fadeIn w-fit py-4 ">
              <div className="flex items-center mb-4 px-4 py-2 border-b justify-between">
                <p className="text-base font-semibold">Notification</p>

                <IoMdClose className="cursor-pointer  mt-1 md:mt-2" onClick={onClose} />
              </div>
              <div className="px-5">{children}</div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {open && (
          <div
            onClick={onClose}
            className={
              congrat
                ? " bg-[url('/congrats.gif')] bg-contain  fixed z-50   left-0  bg-black/30  top-0  w-full h-screen flex justify-center items-center"
                : "fixed z-50   left-0  bg-black/30  top-0  w-full h-screen flex justify-center items-center"
            }
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-sm rounded-md animate__animated mt-3 animate__fadeIn w-fit py-5 px-5"
            >
              <div className={title !== undefined ? "flex justify-between" : "flex justify-end"}>
                {title !== undefined && <p className="text-lg font-semibold">{title}</p>}
                {removeClose ? null : (
                  <IoMdClose
                    className={
                      title !== undefined
                        ? "cursor-pointer right-[27%] md:right-[27%] lg:right-[32%]  mt-1 md:mt-2"
                        : "cursor-pointer absolute    mt-1 md:mt-2"
                    }
                    onClick={onClose}
                  />
                )}
              </div>
              {children}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Modal;
