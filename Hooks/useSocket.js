import Cookies from "js-cookie";
import React, { useRef } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (url, role, isAdmin) => {
  const token = isAdmin ? Cookies.get("adminAccessToken") : Cookies.get("accessToken");
  const options = {
    autoConnect: false,
    reconnectionAttempts: 1,
    extraHeaders: {
      Authorization: token,
      role: role
    }
  };

  role === undefined && delete options.extraHeaders.role;

  const { current: socket } = useRef(io(url, options));
  //connection to socket
  useEffect(() => {
    if (socket.connected) return;
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};
export default useSocket;
