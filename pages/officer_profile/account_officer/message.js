import React, { useEffect, useState, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsCheck2All, BsEmojiSmile, BsPaperclip, BsPerson, BsSearch } from "react-icons/bs";
import Layout from "../../../components/officer_layout/Layout";
import ActiveChatHead from "../../../components/admincomponents/ActiveChatHead";
import ChatWidget from "../../../components/admincomponents/ChatWidget";
import Divider from "../../../components/common/Divider";
import EmptyTable from "../../../components/common/EmptyTable";
import EmtyMessage from "../../../components/admincomponents/EmptyMessage";
import useSocket from "../../../Hooks/useSocket";
import { BASE_URL, CHAT_URL } from "../../../api/base";
import { useSnackbar } from "notistack";
import { getTimeAgo } from "../../../components/services/getTimeAgo";
import { useSelector } from "react-redux";
import { isDateToday } from "../../../components/services/isDateToday";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { validateToken } from "../../../components/services/validateToken";
function messages({ contacts }) {
  const [activechat, setActiveChat] = useState(null);

  const [contactList, setContactList] = useState(contacts);
  const [conversation, setConversation] = useState([]);
  const [content, setContent] = useState("");
  const [typing, setTyping] = useState(false);

  const [moveDown, setMoveDown] = useState(0);
  const [unReadMsgIds, setUnReadMsgIs] = useState([]);
  const messageRef = useRef();

  const user = useSelector((state) => state.auth.adminDetails);

  const socket = useSocket(CHAT_URL, undefined, true);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(" // connected");
    });

    socket.on("connect_error", (err) => {
      enqueueSnackbar(err.message, {
        variant: "error",
        id: 1
      });
    });

    socket.on("newMessage", (data) => {
      console.log("newMessage ran");
      setTyping(false);
      setMoveDown((prev) => prev + 1);
    });
    socket.on("typingNotifier", (data) => {
      setTyping(data);
    });

    socket.on("chatList", (data) => {
      console.log("chatlist ran");
      setContactList(data);
    });
  }, []);

  const recipient_id = activechat?.id;

  //listening for conversation of clicked user
  useEffect(() => {
    if (activechat !== null) {
      socket.on("conversation", (data) => {
        setMoveDown((prev) => prev + 1);
        setConversation(data);

        const newArr = data.filter(
          (item) => item.is_read === false && item.sender_id === recipient_id
        );
        setUnReadMsgIs(newArr.map((item) => item.id));
      });
    }
  }, [recipient_id, moveDown]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  }, [moveDown]);

  const sendMessage = () => {
    const messageContent = {
      recipient_id: +recipient_id,
      content
    };
    socket.emit("sendMessage", messageContent);
    socket.on("sendMessage", (data) => {
      setMoveDown((prev) => prev + 1);
      setContent("");
    });
  };
  const handleTyping = () => {
    socket.emit("typingNotifier", { recipient_id });
  };

  return (
    <div>
      <div className="flex  md:flex-row mb-5  md:mb-10 justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Chats </p>
      </div>
      {activechat !== null && (
        <div onClick={() => setActiveChat(null)} className="md:hidden mb-5">
          <button
            // onClick={() => router.push("/admin/admin_mgt/create_admin")}
            className="bg-gray-200 cursor-pointer flex space-x-2 hover:to-blue-500 text-[14px] justify-center items-center text-textColor rounded-md px-2 p-1 "
          >
            Back
          </button>
        </div>
      )}
      {/* mobile breakpoint ################################################# */}
      <div className="flex w-full md:hidden space-x-6 h-full ">
        {activechat == null ? (
          <div className="border rounded-md p-3 w-full md:w-2/5">
            {/* header ############### */}
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center">
                <p className="text-sm text-textColor mb-2">Contacts ({contactList?.length})</p>
              </div>

              <div className=" flex  px-2 py-0.5 w-[9rem] border rounded-lg bg-adminbg">
                <input
                  placeholder="Search chats..."
                  className=" outline-none placeholder:text-xs  w-full bg-white"
                  type={"text"}
                />
                <div className="bg-scudGreen p-[7px] rounded-full flex justify-center items-center">
                  <BsSearch className="text-white text-sm" />
                </div>
              </div>
            </div>
            <Divider />
            {/* chats  ############### */}
            {contactList?.length === 0 ? (
              <EmptyTable
                name="contact"
                Icon={MdOutlinePermContactCalendar}
                title={"No cantact List"}
              />
            ) : (
              <div className="overflow-y-scroll max-h-[500px] h-[500px] ">
                {contactList?.map((item, idx) => (
                  <ChatWidget
                    key={idx}
                    item={item}
                    onClick={() => {
                      setActiveChat(item);
                      socket.emit("readMessages", [item.last_message.id]);
                      socket.emit("conversation", { recipient_id: item.id });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activechat !== null ? (
          <div className="border-2 rounded-md  w-full md:w-3/5   max-h-[800px] h-[550px]  flex flex-col relative">
            <div className="flex   self-start justify-start  px-1 md:px-0 md:left-auto  w-full bg-white border-b">
              <div className="flex  justify-between items-center w-full ">
                <div className="w-3/5 mx-1 flex md:mx-5  ">
                  <ActiveChatHead
                    typing={typing}
                    avatar={activechat?.picture}
                    name={activechat?.first_name + " " + activechat?.last_name}
                    statusText={"Currently online"}
                    status={"online"}
                  />
                </div>
                <div>
                  <span className=" text-sm  text-scudGreen space-x-1 w-full">
                    <BsPerson className="mt-0.5 mr-3" />
                    {/* <p className="text- ">View Profile</p> */}
                  </span>
                </div>
              </div>
            </div>
            {/* chat box ################################## */}
            <div className="w-full  h-full px-4  overflow-y-scroll">
              <div className="mb-20">
                {/* chat section ################################################################## */}
                {conversation?.map((msg, index) =>
                  msg?.sender_id === user?.id ? (
                    <div key={index} className="flex flex-col w-full my-2">
                      <div className="flex justify-end">
                        <div>
                          <div className="flex justify-center items-center space-x-3">
                            <div className=" p-2 rounded-t-md rounded-bl-md border max-w-[250px] md:max-w-[350px]">
                              <p className=" text-xs text-textColor">{msg.content}</p>
                            </div>{" "}
                            {/* <BsCheck2All /> */}
                          </div>
                          <div className="flex justify-end mr-1 mt-0.5 space-x-1">
                            {isDateToday(msg.created_at) ? (
                              <p className="text-[8px] text-[#9E9FA3] ">
                                {new Date(msg.created_at).toLocaleTimeString([], {
                                  hour12: true,
                                  hour: "numeric",
                                  minute: "numeric"
                                })}
                              </p>
                            ) : (
                              <p className="text-[7px] text-[#9E9FA3] ">
                                {" "}
                                {getTimeAgo(msg.created_at)}
                              </p>
                            )}

                            {msg.is_read && (
                              <BsCheck2All className="text-[7px] mt-[1px] text-[#9E9FA3]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="flex flex-col w-full my-2">
                      <div className="flex justify-start">
                        <div>
                          <div className="flex justify-center items-center space-x-3">
                            <div className="bg-[#E6EBFF] p-2 rounded-t-md rounded-br-md border max-w-[250px] md:max-w-[350px]">
                              <p className=" text-xs text-textColor">{msg.content}</p>
                            </div>
                            {/* <BsCheck2All /> */}
                          </div>
                          <div className="flex justify-start ml-0.5">
                            {isDateToday(msg.created_at) ? (
                              <p className="text-[8px] text-[#9E9FA3] ">
                                {new Date(msg.created_at).toLocaleTimeString([], {
                                  hour12: true,
                                  hour: "numeric",
                                  minute: "numeric"
                                })}
                              </p>
                            ) : (
                              <p className="text-[7px] text-[#9E9FA3] ">
                                {getTimeAgo(msg.created_at)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
                {/* <BsCheck2All /> */}
                {typing && (
                  <div className="flex justify-start">
                    <div>
                      <div className="flex justify-center items-center space-x-3">
                        <div className="bg-[#E6EBFF] p-2 rounded-t-md rounded-br-md border max-w-[250px] md:max-w-[350px]">
                          <p className=" text-xs text-textColor">Typing... {""}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <span ref={messageRef}></span>
              </div>
            </div>
            <div className="flex absolute bottom-0 justify-center items-center h-12 px-3 md:px-0  w-full bg-white border-t">
              <div className="flex  items-center w-full ">
                <div className="w-full mx-1 md:mx-5 ">
                  <textarea
                    rows={1}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    onFocus={handleTyping}
                    className="w-full outline-none focus:border-0 resize-none p-2  rounded-md"
                    placeholder="Type a message here"
                  ></textarea>
                </div>
                <div className="flex justify-between  space-x-2 ">
                  <div className="rounded-full cursor-pointer  w-6 h-6 bg-[#e6eaf8] flex justify-center items-center">
                    <BsPaperclip className="text-sm text-scudGreen" />
                  </div>
                  <div className="rounded-full cursor-pointer  w-6 h-6 bg-[#e6eaf8] flex justify-center items-center">
                    <BsEmojiSmile className="text-sm text-scudGreen" />
                  </div>
                  <button
                    onClick={sendMessage}
                    className="bg-scudGreen cursor-pointer flex space-x-2 hover:to-blue-500 text-[14px] justify-center items-center text-white rounded-md px-2 p-1 "
                  >
                    <AiOutlineSend className="text-sm " />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmtyMessage />
        )}
      </div>

      {/*desktop breakpoint ##################################################  */}
      <div className="hidden md:block">
        <div className="flex w-full space-x-6 h-full ">
          <div className="border rounded-md p-3 w-full md:w-2/5">
            {/* header ############### */}
            <div className="flex justify-between">
              <div className="flex justify-center items-center">
                <p className="text-sm text-textColor mb-2">Contacts ({contactList?.length})</p>
              </div>

              <div className=" flex  px-2 py-1 w-[9rem] border rounded-lg bg-adminbg">
                <input
                  placeholder="Search chats..."
                  className=" outline-none placeholder:text-xs  w-full bg-white"
                  type={"text"}
                />
                <div className="bg-scudGreen p-[7px] rounded-full flex justify-center items-center">
                  <BsSearch className="text-white text-sm" />
                </div>
              </div>
            </div>
            <Divider />
            {/* chats  ############### */}
            <div className="overflow-y-scroll max-h-[400px] ">
              {contactList.map((item, index) => (
                <ChatWidget
                  key={index}
                  item={item}
                  onClick={() => {
                    setActiveChat(item);
                    socket.emit("conversation", { recipient_id: item.id });
                    socket.emit("readMessages", {
                      message_ids: unReadMsgIds,
                      recipient_id: item.id
                    });
                  }}
                />
              ))}
            </div>
          </div>
          {activechat !== null ? (
            <div className="border rounded-md w-full md:w-3/5 relative   h-[400px]  flex flex-col ">
              <div className="flex flex-col justify-start  px-3 md:px-0 md:left-auto p-0.5 w-full bg-white border-b">
                <div className="flex  justify-between items-center w-full">
                  <div className=" h-14 mx-1 flex md:mx-3  ">
                    <ActiveChatHead
                      avatar={activechat?.picture}
                      name={activechat?.first_name + " " + activechat?.last_name}
                      statusText={"Currently online"}
                      status={"online"}
                    />
                  </div>
                  <div>
                    <span className=" mr-3 cursor-pointer m text-scudGreen space-x-1 w-full flex">
                      <BsPerson className="mt-0.5 text-xs" />
                      <p className="text-xs">View Profile</p>
                    </span>
                  </div>
                </div>
              </div>
              {/* chat box ################################## */}
              <div className="w-full max-h-[400px]  overflow-y-auto">
                <div className="mb-20">
                  {/* chat section ################################################################## */}

                  {conversation.map((msg, index) =>
                    msg?.sender_id === user?.id ? (
                      <div key={index} className="px-5 py-3 h-auto flex space-x-2 items-start">
                        <div className="flex flex-col overflow-y-scroll w-full my-2">
                          <div className="flex justify-end">
                            <div>
                              <div className="flex p-4 max-w-[220px] rounded-tl-[30px] bg-[#F9F9F9] rounded-b-[30px] justify-center items-center space-x-3">
                                <p className=" text-xs text-textColor">{msg.content}</p>
                              </div>
                              <div className="flex justify-end space-x-1 mr-2">
                                {isDateToday(msg.created_at) ? (
                                  <p className="text-[8px] text-[#9E9FA3] ">
                                    {new Date(msg.created_at).toLocaleTimeString([], {
                                      hour12: true,
                                      hour: "numeric",
                                      minute: "numeric"
                                    })}
                                  </p>
                                ) : (
                                  <p className="text-[8px] text-[#9E9FA3]">
                                    {" "}
                                    {getTimeAgo(msg.created_at)}
                                  </p>
                                )}
                                {msg.is_read && (
                                  <BsCheck2All className="text-[9px] mt-[1px] text-[#9E9FA3]" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <img alt="" className="w-8 h-8  rounded-full" src="/photo.png" /> */}
                      </div>
                    ) : (
                      <div key={index} className="flex px-5 py-3 space-x-2 items-start">
                        {/* <img alt="" className="w-8 h-8  rounded-full" src="/photo.svg" /> */}
                        <div className="flex flex-col  w-full my-2">
                          <div className="flex justify-start">
                            <div>
                              <div className="flex p-4 max-w-[220px] rounded-tr-[30px] bg-[#E6EBFF] rounded-b-[30px] justify-center items-center space-x-3">
                                <p className=" text-xs text-textColor">{msg.content}</p>
                              </div>
                              <div className="flex ml-5 justify-start">
                                {isDateToday(msg.created_at) ? (
                                  <p className="text-[8px] text-[#9E9FA3] mr-4">
                                    {new Date(msg.created_at).toLocaleTimeString([], {
                                      hour12: true,
                                      hour: "numeric",
                                      minute: "numeric"
                                    })}
                                  </p>
                                ) : (
                                  <p className="text-[8px] text-[#9E9FA3] mr-4">
                                    {" "}
                                    {getTimeAgo(msg.created_at)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  {typing && (
                    <div className="flex justify-start">
                      <div>
                        <div className="flex p-4 max-w-[220px] rounded-tr-[30px] bg-[#E6EBFF] rounded-b-[30px] justify-center items-center space-x-3">
                          <p className=" text-xs text-textColor">Typing... </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <span ref={messageRef}></span>
                </div>
              </div>
              <div className="flex justify-center items-center h-14 absolute bottom-0   w-full bg-white border-t">
                <div className="flex  items-center w-full px-3 ">
                  <div className="w-full mx-1 md:mx-5 ">
                    <textarea
                      rows={1}
                      onChange={(e) => setContent(e.target.value)}
                      //   cols={1}
                      // onChange={handleMessage}
                      value={content}
                      onFocus={handleTyping}
                      className="w-full text-textColor outline-none focus:border-0 resize-none   rounded-md"
                      placeholder="Type a message here"
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center  space-x-5 ">
                    <div className="rounded-full cursor-pointer  w-10 h-10 bg-[#e6eaf8] flex justify-center items-center">
                      <BsPaperclip className="text-xl text-scudGreen" />
                    </div>
                    <div className="rounded-full cursor-pointer  w-10 h-10 bg-[#e6eaf8] flex justify-center items-center">
                      <BsEmojiSmile className="text-xl text-scudGreen" />
                    </div>
                    <button
                      onClick={sendMessage}
                      className="bg-scudGreen items-center cursor-pointer flex space-x-2 text-[14px] text-white rounded-md p-2 "
                    >
                      <p className="text-sm">Send</p>
                      <AiOutlineSend className="text-sm " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmtyMessage />
          )}
        </div>
      </div>
    </div>
  );
}

messages.getLayout = Layout;
export default messages;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const res = await fetch(`${BASE_URL}chats/chatlist`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const contacts = await res.json();
  if (contacts?.statusCode !== undefined && contacts?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      contacts
    }
  };
}
