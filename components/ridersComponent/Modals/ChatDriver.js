import React, { useEffect, useRef, useState } from "react";
import Modal from "../../common/Modal";
import { AiOutlineSend } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import { isDateToday } from "../../services/isDateToday";
import { getTimeAgo } from "../../services/getTimeAgo";
import useSocket from "../../../Hooks/useSocket";
import { CHAT_URL } from "../../../api/base";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

function ChatDriver({ open, onClose }) {
  const [message, setMessage] = useState("");
  const [moveDown, setMoveDown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unReadMsgIds, setUnReadMsgIs] = useState([]);
  const driver = useSelector((state) => state.bookride.connectedUser);
  const user = useSelector((state) => state.auth.userDetails);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const socket = useSocket(CHAT_URL);

  //auto scroll to button effect
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }, [moveDown]);

  // get conversation between rider and driver
  useEffect(() => {
    if (driver !== null) {
      socket.emit("conversation", { recipient_id: driver?.id });
      socket.on("conversation", (data) => {
        setMoveDown((prev) => prev + 1);
        setMessages(data);

        const newArr = data?.filter(
          (item) => item.is_read === false && item.sender_id === recipient_id
        );
        setUnReadMsgIs(newArr.map((item) => item.id));
      });
    }
  }, [driver?.id, moveDown]);

  //listening to various events
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
      setTyping(false);
      setMoveDown((prev) => prev + 1);
    });
    socket.on("typingNotifier", (data) => {
      setTyping(data);
    });
  }, []);

  const sendMessage = () => {
    const messageContent = {
      recipient_id: driver?.id,
      content: message
    };
    socket.emit("sendMessage", messageContent);
    socket.on("sendMessage", (data) => {
      setMoveDown((prev) => prev + 1);
      setMessage("");
    });
  };
  const messageRead = () => {
    socket.emit("readMessages", {
      message_ids: unReadMsgIds,
      recipient_id: driver?.id
    });
  };

  return (
    <Modal
      title={"Chat Driver"}
      onClose={() => {
        onClose();
        messageRead();
      }}
      open={open}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-[19rem] h-full  md:w-[28rem]  md:h-auto"
      >
        <hr className="my-4" /> {/* chat section ################################################*/}
        <div className=" overflow-y-scroll overflow-x-hidden h-[23rem] px-2">
          {/* chat section ################################################################## */}

          {messages.map((msg, index) =>
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
                          <p className="text-[8px] text-[#9E9FA3]"> {getTimeAgo(msg.created_at)}</p>
                        )}
                        {msg.is_read && (
                          <BsCheck2All className="text-[9px] mt-[1px] text-[#9E9FA3]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="flex px-5 py-3 space-x-2 items-start">
                <img alt="" className="w-8 h-8  rounded-full" src={driver?.picture} />
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
        {/* chatinput section ######################################################################################################## */}
        {/* <div className="flex  justify-center items-center w-[19rem]   md:w-[28rem] ">
          <hr />
          <div className="flex -ml-4 md:ml-0 justify-between space-x-3 w-full mt-4">
            <div className="w-[230px]  md:w-full md:mx-5 ">
              <textarea
                rows={1}
                //   cols={1}
                onChange={handleMessage}
                value={message}
                className=" w-[230px] md:w-full outline-none focus:border-0 resize-none p-2 bg-white  rounded-md"
                placeholder="Type a message here"
              ></textarea>
            </div>
            <div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendMessage();
                }}
                style={"mt-0.5"}
                text={[<IoSendOutline className="text-white mr-1 mt-1 " />, "send"]}
              />
            </div>
          
          </div>
        </div> */}
        <div className="flex justify-center items-center py-2   w-full bg-white border rounded-md">
          <div className="flex  items-center w-full px-3 ">
            <div className="w-full mx-1 md:mx-2 ">
              <textarea
                rows={1}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="w-full  text-textColor outline-none focus:border-0 resize-none   rounded-md"
                placeholder="Type a message here"
              ></textarea>
            </div>
            <div className="flex justify-between items-center   ">
              <button
                disabled={message === "" ? true : false}
                onClick={sendMessage}
                className={`${
                  message === "" ? "bg-scudGreen/25" : "bg-scudGreen"
                } items-center cursor-pointer flex space-x-2 text-[10px] text-white rounded-md py-1 px-2 "`}
              >
                <p className="text-sm">Send</p>
                <AiOutlineSend className="text-sm " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChatDriver;
