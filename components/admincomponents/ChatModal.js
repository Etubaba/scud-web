import React from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import useSocket from "../../Hooks/useSocket";
import { CHAT_URL } from "../../api/base";
import Button from "../common/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import Divider from "../common/Divider";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const ChatModal = ({ open, onClose }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const socket = useSocket(CHAT_URL, undefined, true);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("connect_error", (err) => {
      console.log(err);
      enqueueSnackbar(err.message, {
        variant: "error",
        id: 1
      });
    });

    socket.on("exception", (err) => {
      enqueueSnackbar(err.message, {
        variant: "error"
      });
    });

    socket.on("chatList", (data) => {
      setMessage("");
    });
  }, []);

  const recipient_id = Object.keys(router.query)[0];

  const handleSendMessage = () => {
    const messageContent = {
      recipient_id: +recipient_id,
      content: message
    };
    socket.emit("sendMessage", messageContent, (data) => {
      setMessage("");
      console.log(data);
    });
  };

  return (
    <Modal title={"Send message"} onClose={onClose} open={open}>
      <div onClick={(e) => e.stopPropagation()} className=" w-[20rem] md:w-[24rem]  h-auto">
        <Divider />
        <div className="my-2">
          <Input
            textArea={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"Enter message here"}
            row={2}
            col={2}
            // type={"text"}
          />
        </div>
        <div className="flex justify-end mt-8">
          {/* <button
            onClick={() => setAddPhaseModal(false)}
            className="bg-white border-red-600 text-red-600 border hover:bg-slate-50 px-4 py-1 rounded-md text-sm  mr-2"
          >
            Cancel
          </button> */}
          <Button
            disabled={message === "" ? true : false}
            onClick={handleSendMessage}
            // onClick={promoToEdit === null ? createPromo : updatePromo}
            text={"Send"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
