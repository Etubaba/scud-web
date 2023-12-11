import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import Divider from "./Divider";
import { getTimeAgo } from "../services/getTimeAgo";
import { FiTrash } from "react-icons/fi";
import { AiOutlineMail, AiOutlineSend } from "react-icons/ai";
import { BsTag } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";

const MsgComponent = ({ item, setStatModal, setDeleteModal, setDeleteMail }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        open
          ? "border  border-scudGreen rounded-md my-5"
          : "border  hover:border-scudGreen rounded-md my-5"
      }
    >
      <div className="md:flex space-x-2 justify-between p-2 md:p-5">
        <div className="flex justify-between mb-4">
          <div
            className={
              open
                ? "rounded-full  md:hidden flex justify-center   text-white items-center h-8 w-8 bg-scudGreen p-2"
                : "rounded-full   md:hidden flex justify-center items-center h-8 w-8 bg-[#F2F5FF] p-2"
            }
          >
            <AiOutlineMail className={open ? "text-white text-xl " : "text-scudGreen text-xl "} />
          </div>
          <div className="cursor-pointer block md:hidden">
            {open ? (
              <MdOutlineKeyboardArrowUp
                onClick={() => {
                  setOpen(!open);
                }}
                className="text-xl"
              />
            ) : (
              <MdOutlineKeyboardArrowDown
                onClick={() => {
                  setOpen(!open);
                }}
                className="text-xl"
              />
            )}
          </div>
        </div>
        <div
          className={
            open
              ? "rounded-full hidden md:flex  flex-row justify-center text-white items-center h-12 w-12 bg-scudGreen p-3"
              : "rounded-full hidden   md:flex flex-row justify-center items-center h-12 w-12 bg-[#F2F5FF] p-3"
          }
        >
          <AiOutlineMail className={open ? "text-white text-xl " : "text-scudGreen text-xl "} />
        </div>
        <div className="w-4/5">
          <p className="font-semibold">{item.subject}</p>
          {open ? (
            <p className="text-sm animate__animated animate__fadeIn  text-gray-500 leading-8">
              <p
                dangerouslySetInnerHTML={{
                  __html: item.body
                }}
              />
            </p>
          ) : (
            <p className="text-sm flex   text-gray-500 leading-8">
              <p
                dangerouslySetInnerHTML={{
                  __html: item.body.length < 120 ? item.body : item.body.substring(0, 120) + "..."
                }}
              />
            </p>
          )}
        </div>

        <div className="cursor-pointer hidden md:block">
          {open ? (
            <MdOutlineKeyboardArrowUp
              onClick={() => {
                setOpen(!open);
              }}
              className="text-xl"
            />
          ) : (
            <MdOutlineKeyboardArrowDown
              onClick={() => {
                setOpen(!open);
              }}
              className="text-xl"
            />
          )}
        </div>
      </div>
      <div className=" p-5">
        <Divider />
        <div className="md:flex   justify-between">
          <div className="mb-2 md:mb-auto">
            <button
              // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
              className="bg-[#F2F5FF] justify-center items-center   text-sm  flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
            >
              <BsTag /> &nbsp;&nbsp;{item.tags[0]}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 ">
            <button
              onClick={() => setStatModal !== undefined && setStatModal(true)}
              className="bg-[#F2F5FF] justify-center items-center  border border-scudGreen text-scudGreen flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
            >
              <span className="flex space-x-4">
                <BiLineChart className="mt-1" /> <p>Stats</p>
              </span>
            </button>
            <button
              // onClick={() => copyToClipboard("scud.io/ref:jamesanderson")}
              className=" justify-center items-center  bg-scudGreen text-white flex space-x-2 hover:bg-scudGreen/20 text-[14px]  rounded-md p-1 px-3"
            >
              <span className="flex space-x-4">
                <AiOutlineSend className="mt-1" /> <p>Resend</p>
              </span>
            </button>

            <button
              onClick={() => {
                setDeleteMail(item), setDeleteModal(true);
                //   setSuccessAction(item.channel?.toUpperCase());
              }}
              className="bg-[#F2F5FF] justify-center items-center  text-red-500 flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3"
            >
              <span className="flex space-x-4">
                <FiTrash className="mt-1" /> <p>Delete</p>
              </span>
            </button>

            <button className="bg-[#F2F5FF] justify-center items-center text-[#b3b4b5]  text-sm  flex space-x-2 hover:to-blue-500 text-[14px]  rounded-md p-1 px-3">
              {getTimeAgo(item.updated_at)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MsgComponent;
