import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { getTimeAgo } from "../services/getTimeAgo";
import useFetch from "../../Hooks/useFetch";
import { BASE_URL } from "../../api/base";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "../common/Loader";
import { isDateToday } from "../services/isDateToday";

const Officerchat = ({
  accout_officer,
  officerDetails: { officer_name, picture: officer_picture },
  item: { driver, last_message }
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const router = useRouter();
  const id = Object.keys(router.query)[0];
  const user_id = driver?.id;

  const getChats = async () => {
    setLoading(true);
    const token = Cookies.get("adminAccessToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.get["Content-Type"] = "application/json";
    try {
      const { data } = await axios.get(`${BASE_URL}chats/conversation/${id}/${user_id}/`);
      if (data) {
        setLoading(false);
        setChats(data);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const name =
    driver?.first_name.charAt(0).toUpperCase() +
    driver?.first_name.slice(1) +
    " " +
    driver?.last_name.charAt(0).toUpperCase() +
    driver?.last_name.slice(1);

  const picture = driver?.picture;

  return (
    <div
      onClick={() => {
        getChats();
        setOpen(true);
      }}
      className="bg-[#F6F7FF] hover:border-scudGreen border p-4 rounded-lg"
    >
      {" "}
      <div className="flex mb-5 items-center justify-between">
        <div className="flex  items-center space-x-2">
          <img
            alt=""
            className="w-10 rounded-full h-10"
            src={picture === null ? "/user.png" : picture}
          />
          <p className="font-bold">{name}</p>
        </div>
        <p className="text-xs text-textColor/50">{getTimeAgo(last_message.created_at)}</p>
      </div>
      <p className="text-textColor/50 text-sm">{last_message.content}</p>
      {open && (
        <div className="fixed z-50  left-0  bg-black/30 right-0 bottom-0    w-full h-screen flex justify-end items-end">
          <div className="h-[80vh] w-[97%] md:w-[40%] shadow-sm rounded-lg mt-3 animate__animated animate__fadeIn py-4 ">
            <div className="flex items-center rounded-tl-md bg-scudGreen  px-4 py-4 border-b justify-between">
              <div className="flex space-x-4">
                <span className="flex">
                  <img
                    src={officer_picture === null ? "/user.png" : officer_picture}
                    className="w-6 h-6 rounded-full"
                  />
                  <img
                    src={picture === null ? "/user.png" : picture}
                    className="w-6 h-6 -ml-1 rounded-full"
                  />
                </span>
                <p className="text-white">
                  {officer_name} & {name} conversations
                </p>
              </div>

              <IoMdClose
                className="cursor-pointer text-white mt-1 md:mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  setChats([]);
                }}
              />
            </div>
            {chats.length === 0 ? (
              <div className="flex  h-[70vh] bg-white justify-center items-center">
                <Loader secondary={true} />
              </div>
            ) : (
              <div className="p-5 max-h-[70vh] overflow-y-auto bg-white">
                {chats.map((item, idx) =>
                  item.recipient_id === +id ? (
                    <div key={idx} className="flex space-x-2 items-start">
                      <div className="flex flex-col overflow-y-scroll w-full my-2">
                        <div className="flex justify-end">
                          <div>
                            <div className="flex p-4 max-w-[220px] rounded-tl-[30px] bg-[#F9F9F9] rounded-b-[30px] justify-center items-center space-x-3">
                              <p className=" text-xs">{item.content}</p>
                            </div>
                            <div className="flex justify-end">
                              {isDateToday(item.created_at) ? (
                                <p className="text-[8px] text-[#9E9FA3] ">
                                  {new Date(item.created_at).toLocaleTimeString([], {
                                    hour12: true,
                                    hour: "numeric",
                                    minute: "numeric"
                                  })}
                                </p>
                              ) : (
                                <p className="text-[7px] text-[#9E9FA3] ">
                                  {" "}
                                  {getTimeAgo(item.created_at)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <img
                        alt=""
                        className="w-10 h-10  rounded-full"
                        src={picture === null ? "/user.png" : picture}
                      />
                    </div>
                  ) : (
                    <div key={idx} className="flex space-x-2 items-start">
                      <img
                        alt=""
                        className="w-10 h-10  rounded-full"
                        src={officer_picture === null ? "/user.png" : officer_picture}
                      />
                      <div className="flex flex-col  w-full my-2">
                        <div className="flex justify-start">
                          <div>
                            <div className="flex p-4 max-w-[220px] rounded-tr-[30px] bg-[#E6EBFF] rounded-b-[30px] justify-center items-center space-x-3">
                              <p className=" text-xs">{item.content}</p>
                            </div>
                            <div className="flex ml-5 justify-start">
                              {isDateToday(item.created_at) ? (
                                <p className="text-[8px] text-[#9E9FA3] ">
                                  {new Date(item.created_at).toLocaleTimeString([], {
                                    hour12: true,
                                    hour: "numeric",
                                    minute: "numeric"
                                  })}
                                </p>
                              ) : (
                                <p className="text-[7px] text-[#9E9FA3] ">
                                  {" "}
                                  {getTimeAgo(item.created_at)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Officerchat;
